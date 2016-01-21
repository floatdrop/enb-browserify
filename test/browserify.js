/* global describe, it, afterEach */
require('chai').should();
var MockNode = require('mock-enb/lib/mock-node');
var BrowserifyTech = require('../techs/browserify');
var mockFs = require('mock-fs');

describe('enb-browserify', function () {
	afterEach(function () {
		mockFs.restore();
	});

	it('concatinates requires', function (done) {
		mockFs({
			'bundle/bundle.node.js': 'require(\'../node_modules/module-a\');require(\'../node_modules/module-b\');',
			'node_modules/module-a.js': 'var a = \'a test\'; module.exports= a',
			'node_modules/module-b.js': 'var b = \'b test\'; module.exports= b'
		});

		var bundle = new MockNode('bundle');

		return bundle.runTechAndGetContent(BrowserifyTech, {source: '?.node.js', target: '?.browser.js'})
			.then(function (result) {
				var code = result[0].toString();
				code.indexOf('var a = \'a test\'; module.exports= a').should.not.be.eql(-1);
				code.indexOf('var b = \'b test\'; module.exports= b').should.not.be.eql(-1);
			})
			.then(done, done);
	});
});
