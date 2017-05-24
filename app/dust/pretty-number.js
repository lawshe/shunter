const _utils = require('../../utils.js');

module.exports = dust => {
	dust.filters.prettyNumber = value => {
		return _utils.prettyNumber(value);
	};
};
