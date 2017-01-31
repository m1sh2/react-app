const webpackMerge = require('webpack-merge');
const webpackBuild = require('./webpack.build');

module.exports = webpackMerge(webpackBuild, {
  watch: true
});