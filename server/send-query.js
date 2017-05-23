const request = require('request');
const _config = require('../config.js');
const _processPubmed = require('./process-pubmed-resp.js');

const sendArticleQuery = pmidList => {
	const url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&id=' + pmidList;
	return new Promise((resolve, reject) => {
		request(url, (err, res, body) => {
			if (err) {
				console.error('ERROR sendArticleQuery (send_query):', err);
				reject(err);
			}
			resolve(_processPubmed.articles(body));
		});
	});
};

const sendTermQuery = (term, page) => {
	const numPerPage = _config.results.retmax ? _config.results.retmax : 6;
	let queryOptions = `sort=pub+date&retmax=${numPerPage}&retmode=json&usehistory=y`;

	if (page > 1) {
		const queryStart = (page - 1) * numPerPage;
		queryOptions += `&retstart=${queryStart}`;
	}

	const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?${queryOptions}&term=` + term;
	return new Promise((resolve, reject) => {
		request(url, (err, res, body) => {
			if (err) {
				console.error('ERROR sendTermQuery (send_query):', err);
				reject(err);
			}
			resolve(_processPubmed.termResult(term, body));
		});
	});
};

const sendQuery = {
	sendArticleQuery,
	sendTermQuery
};

module.exports = sendQuery;
