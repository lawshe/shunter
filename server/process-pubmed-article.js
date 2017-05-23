const processDate = (dateObj, issue) => {
	let dateStr = '';
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	if (issue) {
		// 3 Char Month Date
		dateStr += months.indexOf(dateObj.Month) === -1 ? '' : months.indexOf(dateObj.Month) + '/';

		if (!dateObj.Day) {
			dateStr += '01/'; // Only displaying month and year for issue date, and only displaying issue date if no EPUB date.
		}
	} else {
		// 2 Digit Month Date
		dateStr += dateObj.Month ? dateObj.Month + '/' : '';
	}

	dateStr += dateObj.Day ? dateObj.Day + '/' : '';
	dateStr += dateObj.Year ? dateObj.Year : '';
	return dateStr;
};

const article = pubMedArticle => {
	let articleTitle;
	let ePubDate;
	let issue;
	let issuePubDate;
	let pubStatus;
	let volume;
	const ids = {};
	const journal = {};
	const keywords = [];

	const articleJson = (pubMedArticle.MedlineCitation && pubMedArticle.MedlineCitation.Article) ? pubMedArticle.MedlineCitation.Article : null;
	const articleKeywordJson = (pubMedArticle.MedlineCitation && pubMedArticle.MedlineCitation.KeywordList && pubMedArticle.MedlineCitation.KeywordList.Keyword) ? pubMedArticle.MedlineCitation.KeywordList.Keyword : null;

	ids.pmid = (pubMedArticle.MedlineCitation && pubMedArticle.MedlineCitation.PMID && pubMedArticle.MedlineCitation.PMID.$t) ? pubMedArticle.MedlineCitation.PMID.$t : null;

	// Journal
	if (articleJson && articleJson.Journal) {
		// Name
		if (articleJson.Journal.Title) {
			journal.title = articleJson.Journal.Title;
		}
		// Issue
		if (articleJson.Journal.JournalIssue.Volume) {
			volume = articleJson.Journal.JournalIssue.Volume;
		}
		if (articleJson.Journal.JournalIssue.Issue) {
			issue = articleJson.Journal.JournalIssue.Issue;
		}
		// Issue Pub Date
		if (articleJson.Journal.JournalIssue && articleJson.Journal.JournalIssue.PubDate) {
			issuePubDate = processDate(articleJson.Journal.JournalIssue.PubDate, true);
		}
	}

	// Keywords
	if (articleKeywordJson) {
		articleKeywordJson.forEach(kw => {
			keywords.push(kw.$t);
		});
	}

	if (pubMedArticle.PubmedData) {
		// IDs
		if (pubMedArticle.PubmedData.ArticleIdList && pubMedArticle.PubmedData.ArticleIdList.ArticleId) {
			if (Object.prototype.toString.call(pubMedArticle.PubmedData.ArticleIdList.ArticleId) === '[object Array]') {
				pubMedArticle.PubmedData.ArticleIdList.ArticleId.forEach(idData => {
					ids[idData.IdType] = idData.$t;
				});
			} else if (pubMedArticle.PubmedData.ArticleIdList.ArticleId.IdType) {
				ids[pubMedArticle.PubmedData.ArticleIdList.ArticleId.IdType] = pubMedArticle.PubmedData.ArticleIdList.ArticleId.$t;
			}
		}

		// Pub Status
		if (pubMedArticle.PubmedData.PublicationStatus) {
			pubStatus = pubMedArticle.PubmedData.PublicationStatus;
		}
	}

	if (articleJson) {
		// Title
		articleTitle = (articleJson.ArticleTitle) ? articleJson.ArticleTitle : 'N/A';

		// EPub Date
		if (articleJson.ArticleDate) {
			if (articleJson.ArticleDate.DateType === 'Electronic') {
				ePubDate = processDate(articleJson.ArticleDate, false);
			}
		}
	}

	// Result Data
	const articleData = {
		ids,
		ePubDate,
		issue,
		issuePubDate,
		journal,
		keywords,
		pubStatus,
		articleTitle,
		volume
	};

	return articleData;
};

module.exports = {article};
