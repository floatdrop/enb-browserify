/**
 * enb-browserify
 * =========
 *
 * Раскрывает require, используя browserify.
 *
 * **Опции**
 *
 * * *String* **source** — Исходный таргет. Обязательная опция.
 * * *String* **target** — Результирующий таргет. По умолчанию — `?.browser.js`.
 * * *Object* **opts** — Опции для browserify
 * * *Array* **plugins** — Плагины для browserify
 * * *Array* **transforms** — Трансформации для browserify
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech([ require('enb-browserify/techs/browserify'), {
 * source: '?.node.js',
 * target: '?.browser.js',
 * opts: {
 *	 detectGlobals: false,
 *	 debug: true
 * },
 * plugins: [require('bundle-collapser/plugin')]
 * transforms: [[globalShim, {global: true}]]
 * } ]);
 * ```
 */
var browserify = require('browserify');
var vow = require('vow');

module.exports = require('enb/lib/build-flow').create()
	.name('browserify')
	.target('target', '?.browser.js')
	.defineRequiredOption('target')
	.defineRequiredOption('source')
	.useSourceFilename('source')
	.defineOption('opts', {})
	.defineOption('plugins', [])
	.defineOption('transforms', [])
	.builder(function (source) {
		var b = browserify(this._opts);

		this._plugins.forEach(function (plugin) {
			b.plugin(plugin);
		});

		this._transforms.forEach(function (transform) {
			b.transform(transform);
		});

		return new vow.Promise(function (resolve, reject) {
			b.add(source).bundle(function (err, data) {
				if (err) {
					return reject(err);
				}
				resolve(data);
			});
		});
	})
	.createTech();
