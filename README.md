## build-manifest-webpack-plugin


## Install

    npm install --save-dev build-manifest-webpack-plugin


## Usage

```
const BuildManifestPlugin = require('build-manifest-webpack-plugin')

new BuildManifestPlugin({
    name:"build-manifest.json",
    buildPath:path.join(__dirname, "build"),
    ignore:['.DS_Store']
})
```