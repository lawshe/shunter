module.exports = environment => {
	environment.registerHelper('currentYear', () => {
		const date = new Date();
		return date.getFullYear();
	});
};
