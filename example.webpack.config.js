const path = require("path");

module.exports = {
    entry: "./example/src/entry.js",
    output: {
        path: __dirname,
        filename: "./example/dist/bundle.js"
    },
    module: {
        rules: [
            {
                test: /.*\.(gif|png|jpe?g|svg|bmp)$/i,
                loader: path.join(__dirname, "./static-asset-loader"),
                options: {
                    relativeTo: path.join(__dirname, "example/static"),
                    prefix: "https://assets.somedomain.com/"
                }
            }
        ]
    },
    // Add a resolve alias so we can references our static
    // assets anywhere in the codebase with require("static/img/test.jpg")
    resolve: {
        alias: {
            "static/img": path.join(__dirname, "./example/static/img")
        }
    }
};
