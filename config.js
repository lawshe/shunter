module.exports = {
	results: {
		retmax: 3
	},
	server: {
		port: 5401
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
