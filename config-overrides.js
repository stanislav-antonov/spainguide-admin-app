const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
    if (!config.plugins) {
        config.plugins = [];
    }

    config.plugins.push(
        new CopyWebpackPlugin([
            {from: 'src/dist/bootstrap', to: 'dist/bootstrap'},
            {from: 'src/dist/jquery', to: 'dist/jquery'},
            {from: 'src/dist/tinymce', to: 'dist/tinymce'},
            {from: 'src/dist/common.js', to: 'dist/'},
        ])
    );

    return config;
}
