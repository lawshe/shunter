const express = require('express');
const _config = require('../config.js');
const _sendQuery = require('./send-query');

const app = express();
const publicAssets = __dirname.replace('/server', '/public/resources');
console.log('publicAssets = ', publicAssets);
// Root
app.get('/', (req, res) => {
	console.log('Home requested');
	res.writeHead(200, {
		'Content-Type': 'application/x-shunter+json'
	});
	res.end(JSON.stringify(_config.pages.home));
});

app.get('/about', (req, res) => {
	console.log('About requested');
	res.writeHead(200, {
		'Content-Type': 'application/x-shunter+json'
	});

	res.end(JSON.stringify(_config.pages.about));
});

app.get('/search', (req, res) => {
	res.writeHead(200, {
		'Content-Type': 'application/x-shunter+json'
	});

	let totalPages;
	const pageClone = JSON.parse(JSON.stringify(_config.pages.searchPage));
	pageClone.query = req.query;
	pageClone.error = false;
	pageClone.results = {};
	pageClone.pagination = {};

	// Send query to PubMed. Articles array returned
	if (req.query.term) {
		_sendQuery.sendTermQuery(req.query.term, req.query.page).catch(err => {
			console.log('ERROR sendTermQuery (index):', err);
			pageClone.error = err;
		}).then(queryResult => {
			if (queryResult) {
				// Total results
				if (queryResult.count) {
					pageClone.results.total = parseInt(queryResult.count, 10);
				}

				// Current Page
				pageClone.page = req.query.page ? parseInt(req.query.page, 10) : 1;

				// Prev Page
				if (pageClone.page && pageClone.page !== 1) {
					pageClone.pagination.prev = pageClone.page - 1;
				}

				// Next Page
				if (_config.results.retmax && queryResult.count) {
					totalPages = Math.ceil(queryResult.count / _config.results.retmax);
					if (totalPages && totalPages !== pageClone.page) {
						pageClone.pagination.next = pageClone.page + 1;
					}
				}

				// Query for article data via PMID
				if (queryResult && queryResult.pmids) {
					_sendQuery.sendArticleQuery(queryResult.pmids).catch(err => {
						console.error('ERROR sendArticleQuery (index):', err);
						pageClone.error = err;
					}).then(articles => {
						pageClone.results.articles = articles ? articles : null;
						res.end(JSON.stringify(pageClone));
					});
				}
			} else {
				res.end(JSON.stringify(pageClone));
			}
		});
	} else {
		res.end(JSON.stringify(pageClone));
	}
});

app.use('/public/resources', (req, res, next) => {
    console.log('Resource request', req.originalUrl);
    next();
}, express.static(publicAssets));


app.get('*', (req, res) => {
	console.log('404', req.url);
	res.writeHead(404, {
		'Content-Type': 'application/x-shunter+json'
	});
	res.end(JSON.stringify(_config.pages.fourOhFour));
});

app.listen(_config.server.port);

console.log('..Server started on port', _config.server.port);
