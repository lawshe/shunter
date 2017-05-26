module.exports = {
	results: {
		retmax: 3
	},
	server: {
		host: 'https://lawshe-shunter-server.herokuapp.com/',
		port: process.env.PORT || 5000
	},
	pages: {
		about: {
			layout: {
				template: 'about'
			},
			title: 'PubMed Search - About'
		},
		fourOhFour: {
			layout: {
				template: '404'
			},
			title: 'PubMed Search - 404'
		},
		home: {
			layout: {
				template: 'home'
			},
			title: 'PubMed Search Home'
		},
		searchPage: {
			layout: {
				template: 'search'
			},
			title: 'PubMed Search',
			results: {}
		}
	}
};
