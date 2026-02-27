const webpack = require("webpack");
const {ModuleFederationPlugin} = require("webpack").container;

module.exports = {
    devServer: {
        port: 5000, // Replace 5000 with your desired port number
    },
    webpack: {
        plugins: {
            add: [
                new ModuleFederationPlugin({
                    name: "vocabularyApp",            // ⬅ remoteName
                    filename: "remoteEntry.js",        // ⬅ file bạn cần
                    exposes: {
                        "./mount": "./src/mount",                                         // 👈 Angular host
                        "./Dashboard": "./src/pages/Dashboard/DashboardComponent"              // 👈 React host (optional)
                    },
                    // shared: {
                    //     react: {
                    //         singleton: true,
                    //         requiredVersion: false
                    //     },
                    //     "react-dom": {
                    //         singleton: true,
                    //         requiredVersion: false
                    //     },
                    //     "react/jsx-runtime": {
                    //         singleton: true,
                    //         requiredVersion: false
                    //     }
                    // }
                })
            ]
        },

        configure: (webpackConfig) => {
            webpackConfig.output.publicPath = "auto";

            webpackConfig.resolve.fallback = {
                ...webpackConfig.resolve.fallback,
                // path: require.resolve("path-browserify"),
                // crypto: require.resolve("crypto-browserify"),
                // stream: require.resolve("stream-browserify"),
                // buffer: require.resolve("buffer/"),
                // assert: require.resolve("assert"),
                // process: require.resolve("process/browser.js"),
            };

            return webpackConfig;
        },
    },
};
