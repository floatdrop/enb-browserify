var inherit = require('inherit');
var browserify = require('browserify');
var fs = require('fs');

module.exports = inherit(require('enb/lib/tech/base-tech'), {
    getName: function () {
        return 'browserify';
    },

    configure: function () {
        this._source = this.getOption('sourceTarget');
        if (!this._source) {
            this._source = this.getRequiredOption('source');
        }
        this._target = this.getOption('destTarget');
        if (!this._target) {
            this._target = this.getRequiredOption('target');
        }
    },

    getTargets: function () {
        return [this.node.unmaskTargetName(this._source)];
    },

    build: function () {
        var target = this.node.unmaskTargetName(this._target);
        var targetPath = this.node.resolvePath(target);
        var source = this.node.unmaskTargetName(this._source);
        var sourcePath = this.node.resolvePath(source);
        var _this = this;
        browserify(sourcePath).bundle().pipe(
            fs.createWriteStream(targetPath)
        ).on('end', function () {
            _this.node.resolveTarget(target);
        });
    }
});
