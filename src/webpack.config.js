const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    // Configuration in common to both client-side and server-side bundles.
    const sharedConfig = () => {

        var config = {
            mode: isDevBuild ? "development" : "production",
            optimization: {
                minimize: !isDevBuild
            },
            stats: { modules: false },
            resolve: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.jpg']
            },
            output: {
                filename: '[name].js',
                publicPath: 'dist/', // Webpack dev middleware, if enabled, handles requests for this URL prefix.
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/, include: /ClientApp/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    compact: true
                                }
                            },
                            {
                                loader: 'ts-loader',
                                options: {
                                    // Disable type checker - we will use it in fork plugin.
                                    transpileOnly: true
                                }
                            },
                            'ts-nameof-loader']
                    },
                    {
                        test: /\.(gif|png|jpe?g|svg)$/i,
                        use: [
                            'file-loader',
                            {
                                loader: 'image-webpack-loader'
                            }
                        ]
                    },
                    { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
                ]
            },
            plugins: [
                new ForkTsCheckerWebpackPlugin(),
                // Moment.js is an extremely popular library that bundles large locale files
                // by default due to how Webpack interprets its code. This is a practical
                // solution that requires the user to opt into importing specific locales.
                // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
                // You can remove this if you don't use Moment.js:
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
            ].concat(isDevBuild ? [
                // Add module names to factory functions so they appear in browser profiler.
                new webpack.NamedModulesPlugin(),
                // Watcher doesn't work well if you mistype casing in a path so we use
                // a plugin that prints an error when you attempt to do this.
                // See https://github.com/facebookincubator/create-react-app/issues/240
                new CaseSensitivePathsPlugin(),
                // If you require a missing module and then `npm install` it, you still have
                // to restart the development server for Webpack to discover it. This plugin
                // makes the discovery automatic so you don't have to restart.
                // See https://github.com/facebookincubator/create-react-app/issues/186
                new WatchMissingNodeModulesPlugin(path.resolve(__dirname, '..', 'node_modules'))
            ] : [])
        };

        if (isDevBuild) {
            config = {
                ...config,
                // Turn off performance hints during development because we don't do any
                // splitting or minification in interest of speed. These warnings become
                // cumbersome.
                performance: {
                    hints: false,
                }
            };
        }

        return config;
    };

    // Configuration for client-side bundle suitable for running in browsers.
    const clientBundleOutputDir = './wwwroot/dist';
    const clientBundleConfig = merge(sharedConfig(), {
        entry: { 'main-client': './ClientApp/boot-client.tsx' },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: isDevBuild ? 
                        ['style-loader', 'css-loader'] : 
                        [MiniCssExtractPlugin.loader, 'css-loader']
                },
                {
                    test: /\.(scss|sass)$/,
                    use: isDevBuild ?
                        ['style-loader', 'css-loader', 'sass-loader'] :
                        [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                }
            ]
        },
        output: { path: path.join(__dirname, clientBundleOutputDir) },
        // Some libraries import Node modules but don't use them in the browser.
        // Tell Webpack to provide empty mocks for them so importing them works.
        node: {
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty',
        },
        plugins: [
            //new ExtractTextPlugin('site.css'),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            })
        ].concat(isDevBuild ? [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps.
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
                // Plugins that apply in production builds only
                new MiniCssExtractPlugin({
                    filename: "site.css"
                })
            ])
    });

    // Configuration for server-side (prerendering) bundle suitable for running in Node.
    const serverBundleConfig = merge(sharedConfig(), {
        module: {
            rules: [
                { test: /\.(scss|sass)$/, use: "ignore-loader" }
            ]
        },
        resolve: { mainFields: ['main'] },
        entry: { 'main-server': './ClientApp/boot-server.tsx' },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./ClientApp/dist/vendor-manifest.json'),
                sourceType: 'commonjs2',
                name: './vendor'
            })
        ],
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, './ClientApp/dist')
        },
        target: 'node',
        devtool: 'inline-source-map'
    });

    return [clientBundleConfig, serverBundleConfig];
};