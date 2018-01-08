var path = require('path');
var fs = require('fs');

function BuildManifestPlugin(options) {
    var defaultOptions = {
        name: 'build-manifest.json',
        buildPath: path.join(__dirname, "build"),
        ignore: ['.DS_Store']
    };
    this.options = Object.assign(defaultOptions, options);
    if (this.options.ignore.indexOf(this.options.name) !== -1) {
        this.options.ignore.push(this.options.name)
    }
    this.file_paths = []
}

BuildManifestPlugin.prototype.apply = function (compiler) {
    var that = this;
    compiler.plugin('done', function () {
        that.read(that.options.buildPath);
        console.log('\n build-manifest-webpack-plugin: total ' + that.file_paths.length + ' files found' + '\n');
        fs.writeFileSync(path.resolve(that.options.buildPath, that.options.name), JSON.stringify(that.file_paths), 'utf-8');
    });
};

BuildManifestPlugin.prototype.read = function (dir) {
    var that = this;
    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
        if (that.options.ignore.length && that.options.ignore.indexOf(file) !== -1) return;
        var file_path = path.resolve(dir, file);
        var stats = fs.statSync(file_path);
        if (stats.isDirectory()) {
            that.read(file_path)
        } else {
            that.file_paths.push(file_path.replace(that.options.buildPath, ''))
        }
    });
};

module.exports = BuildManifestPlugin;