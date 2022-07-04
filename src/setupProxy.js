const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {
    app.use(
        '/pubticker',
        createProxyMiddleware({
            target: 'https://api.bitfinex.com/v1',
            changeOrigin: true,
        })
    )

    app.use(
        '/symbols',
        createProxyMiddleware({
            target: 'https://api.bitfinex.com/v1',
            changeOrigin: true,
        })
    );

};