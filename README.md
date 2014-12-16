enb-browserify
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

