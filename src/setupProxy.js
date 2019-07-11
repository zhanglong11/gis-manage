const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/main', {
        target: 'http://172.16.10.26:22222',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
            "^/main": "/"
        }
    }))
};

//
// module.exports = function(app) {
//     app.use(proxy('/main', {
//         target: 'http://172.16.10.19:10000',
//         secure: false,
//         changeOrigin: true,
//         pathRewrite: {
//             "^/main": "/"
//         },
//     }));
//     app.use(proxy('/core', {
//         target: 'http://172.16.10.19:10011',
//         secure: false,
//         changeOrigin: true,
//         pathRewrite: {
//             "^/core": "/"
//         },
//     }));
// };