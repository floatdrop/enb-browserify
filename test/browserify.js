require('chai').should();
var TestNode = require('enb/lib/test/mocks/test-node');
var BrowserifyTech = require('../techs/browserify');
var mockFs = require('mock-fs');

describe('Techs', function () {
	var node;
	afterEach(function () {
		mockFs.restore();
	});


	describe('Techs', function () {
		it('Browserify', function (done) {
			mockFs({
				bundle: {
					'bundle.node.js': 'require(\'../node_modules/module-a\');require(\'../node_modules/module-b\');'
				},
				node_modules: {
					'module-a.js': 'var a = \'a test\'; module.exports= a',
					'module-b.js': 'var b = \'b test\'; module.exports= b'
				}
			});
			var bundle = new TestNode('bundle');
			return bundle.runTechAndGetContent(BrowserifyTech, {source: '?.node.js', target: '?.browser.js'})
				.then(function (result) {
					result.toString().match('var a = \'a test\'; module.exports= a').should.to.be.not.an('array');
					result.toString().match('var b = \'b test\'; module.exports= b').should.to.be.an('array');
				})
				.then(done, done);
		})
	});
});
