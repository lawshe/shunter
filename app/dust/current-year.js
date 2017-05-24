module.exports = dust => {
	dust.helpers.currentYear = chunk => {
		const date = new Date();
		return chunk.write(date.getFullYear());
	};
};
