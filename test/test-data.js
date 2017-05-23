const searchJsonEx = {
	title: 'PubMed Search',
	results: {
		total: 6066749,
		articles: [
			{
				ids: {
					pmid: '28389899',
					pubmed: '28389899',
					doi: '10.1186/s13568-017-0380-7',
					pmc: 'PMC5383910'
				},
				ePubDate: '04/07/2017',
				issue: '1',
				issuePubDate: '11/01/2017',
				journal: {
					title: 'AMB Express'
				},
				keywords: [
					'Degradation',
					'Discharge',
					'Non-thermal gas plasma',
					'Shiga toxin',
					'Static induction thyristor',
					'Verotoxin'
				],
				pubStatus: 'ppublish',
				title: 'Degradation and inactivation of Shiga toxins by nitrogen gas plasma.',
				volume: '7'
			},
			{
				ids: {
					pmid: '28357784',
					pubmed: '28357784',
					doi: '10.1186/s13568-017-0368-3',
					pmc: 'PMC5371579'
				},
				ePubDate: '03/29/2017',
				issue: '1',
				issuePubDate: '11/01/2017',
				journal: {
					title: 'AMB Express'
				},
				keywords: [
					'Expression',
					'Laccase',
					'Micropollutant degradation',
					'Pichia pastoris'
				],
				pubStatus: 'ppublish',
				title: 'Expression of a new laccase from Moniliophthora roreri at high levels in Pichia pastoris and its potential application in micropollutant degradation.',
				volume: '7'
			},
			{
				ids: {
					pmid: '28342171',
					pubmed: '28342171',
					doi: '10.1186/s13568-017-0372-7',
					pmc: 'PMC5366992'
				},
				ePubDate: '03/24/2017',
				issue: '1',
				issuePubDate: '11/01/2017',
				journal: {
					title: 'AMB Express'
				},
				keywords: [
					'Alpha-mating factor signal peptide',
					'Broadly neutralising antibody',
					'Murine IgG1 signal peptide',
					'Pichia pastoris/Komagataella phaffi',
					'VRC01'
				],
				pubStatus: 'ppublish',
				title: 'Expressing anti-HIV VRC01 antibody using the murine IgG1 secretion signal in Pichia pastoris.',
				volume: '7'
			}
		]
	},
	query: {
		term: 'cell',
		page: '4'
	},
	pagination: {
		prev: 3,
		next: 5
	},
	page: 4
};

const noResultsEx = {
	title: 'PubMed Search',
	results: {
		total: 0,
		articles: null
	},
	query: {
		term: 'Smeghead'
	},
	error: false,
	pagination: {},
	page: 1
};

module.exports = {
	searchJsonEx,
	noResultsEx
};
