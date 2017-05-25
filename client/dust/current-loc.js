const _config = require('../../config');
const _utils = require('../../utils.js');

module.exports = function (dust) {
	dust.helpers.currentLoc = (chunk, context, bodies, params) => {
		let locStart = '1';
		let location;
		let locEnd;

		if (params.page !== 1) {
			locStart = _utils.prettyNumber((params.page * _config.results.retmax) - (_config.results.retmax + 1));
			locEnd = params.page * _config.results.retmax;
		}

		location = locStart;

		if (locEnd < params.total) {
			location += '-' + locEnd;
		}

		return location;
	};
};
