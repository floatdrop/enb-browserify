enb-browserify [![Build Status](https://travis-ci.org/floatdrop/enb-browserify.svg?branch=master)](https://travis-ci.org/floatdrop/enb-browserify)
=========

Раскрывает require, используя browserify.

**Опции**

* *String* **source** — Исходный таргет. Обязательная опция.
* *String* **target** — Результирующий таргет. По умолчанию — `?.browser.js`.

**Пример**

```javascript
nodeConfig.addTech([ require('enb-browserify/techs/browserify'), {
    source: '?.node.js',
    target: '?.browser.js'
} ]);
```
