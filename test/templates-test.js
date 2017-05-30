const assert = require('assert');
const helper = require('shunter').testhelper();
const testData = require('./test-data.js');

const rootdir = __dirname.substring(0, __dirname.indexOf('/test')) + '/client';

// Tests
describe('Next button', () => {
	before(() => {
		setupSearchHelper();
	});
	after(helper.teardown);

	it('should display when results remain', done => {
		helper.render('search', testData.searchJsonEx, (error, $) => {
			assert.strictEqual($('#next-btn').length, 1);
			done();
		});
	});
});
describe('Prev button', () => {
	before(() => {
		setupSearchHelper();
	});
	after(helper.teardown);

	it('should display when previous results exist', done => {
		helper.render('search', testData.searchJsonEx, (error, $) => {
			assert.strictEqual($('#prev-btn').length, 1);
			done();
		});
	});
});
describe('Next button when no results', () => {
	before(() => {
		setupSearchHelper();
	});
	after(helper.teardown);

	it('should not display', done => {
		helper.render('search', testData.noResultsEx, (error, $) => {
			assert.strictEqual($('#next-btn').length, 0);
			done();
		});
	});
});
describe('Prev button when no results', () => {
	before(() => {
		setupSearchHelper();
	});
	after(helper.teardown);

	it('should not display', done => {
		helper.render('search', testData.noResultsEx, (error, $) => {
			assert.strictEqual($('#prev-btn').length, 0);
			done();
		});
	});
});
describe('Articles count', () => {
	before(() => {
		setupSearchHelper();
	});
	after(helper.teardown);

	it('each article should be displayed in the UI', done => {
		helper.render('search', testData.searchJsonEx, (error, $) => {
			assert.strictEqual($('.card').length, testData.searchJsonEx.results.articles.length);
			done();
		});
	});
});

// Helper functions for tests
function setupSearchHelper() {
	return helper.setup(rootdir + '/view/search.dust', rootdir + '/view/partials/article.dust', rootdir + '/view/_layout.dust', rootdir + '/view/partials-layout/menu.dust', rootdir + '/view/partials-layout/footer.dust', rootdir + '/view/partials/term-form.dust');
}
