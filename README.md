enb-browserify [![Build Status](https://travis-ci.org/floatdrop/enb-browserify.svg?branch=master)](https://travis-ci.org/floatdrop/enb-browserify)
=========

Раскрывает require, используя browserify.

### Опции

* *String* **source** — Исходный таргет. Обязательная опция.
* *String* **target** — Результирующий таргет. По умолчанию — `?.browser.js`.
* *Array* **plugins** — Плагины для browserify
* *Array* **transforms** — Трансформации для browserify

### Пример

```javascript
nodeConfig.addTech([ require('enb-browserify/techs/browserify'), {
    source: '?.node.js',
    target: '?.browser.js'
} ]);
```

### Transforms

Чтобы добавить трансформации, необходимо использовать [browserify-global-shim](https://github.com/rluba/browserify-global-shim) ([почему он](https://github.com/rluba/browserify-global-shim#similar-libraries))
установка модуля `npm install --save-dev browserify-global-shim`

```javascript
var globalShim = require('browserify-global-shim');

nodeConfig.addTech([ require('enb-browserify/techs/browserify'), {
    source: '?.node.js',
    target: '?.browser.js',
    transforms: [[
        globalShim.configure({
            'lodash': '_',
            'jQuery': '$'
        }),
        {global: true}
    ]]
} ]);

