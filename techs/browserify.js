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
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech([ require('enb-browserify/techs/browserify'), {
 * source: '?.node.js',
 * target: '?.browser.js'
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
    .builder(function (source) {
        return new vow.Promise(function (resolve, reject) {
            browserify(source).bundle(function(err, data) {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    })
    .createTech();
