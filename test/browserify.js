/* global describe, it, afterEach */
require('chai').should();
var TestNode = require('enb/lib/test/mocks/test-node');
var BrowserifyTech = require('../techs/browserify');
var mockFs = require('mock-fs');

describe('Techs', function () {

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
					var code = result[0].toString();
					code.indexOf('var a = \'a test\'; module.exports= a').should.not.be.eql(-1);
					code.indexOf('var b = \'b test\'; module.exports= b').should.not.be.eql(-1);
				})
				.then(done, done);
		});
	});
});
