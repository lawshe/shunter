const parser = require('xml2json');
const _processArticle = require('./process-pubmed-article.js');

const articles = pubMedXml => {
	const pubMedArticleResp = JSON.parse(parser.toJson(pubMedXml));
	if (!pubMedArticleResp.PubmedArticleSet) {
		console.log('No PubmedArticleSet', pubMedArticleResp);
	} else if (pubMedArticleResp.PubmedArticleSet.PubmedArticle) {
		if (Object.prototype.toString.call(pubMedArticleResp.PubmedArticleSet.PubmedArticle) === '[object Array]') {
			return pubMedArticleResp.PubmedArticleSet.PubmedArticle.map(pubMedArticle => {
				return _processArticle.article(pubMedArticle);
			});
		}
		return _processArticle.article(pubMedArticleResp.PubmedArticleSet.PubmedArticle);
	}
};

const termResult = (term, result) => {
	result = result ? JSON.parse(result) : null;
	const processedResult = {
		pmids: []
	};
	if (result && result.esearchresult) {
		// Total
		processedResult.count = result.esearchresult.count ? result.esearchresult.count : null;

		// Article PMIDs
		result.esearchresult.idlist.forEach(pmid => {
			processedResult.pmids.push(pmid);
		});
	}

	return processedResult;
};

const processResponse = {
	articles,
	termResult
};

module.exports = processResponse;
