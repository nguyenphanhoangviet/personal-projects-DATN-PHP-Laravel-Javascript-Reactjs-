const webpack = require('webpack');

module.exports = {
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            util: require.resolve('util/'),
            zlib: require.resolve('browserify-zlib'),
            stream: require.resolve('stream-browserify'),
            url: require.resolve('url/'),
        };
        return config;
    },
};
