/**
 * Web Pack Configuration | Production
 *
 * Compiles source file and push to the distribution
 * folder. CSS is extracted and purged from unneeded
 * styles.
 *
 * Configuration for Tailwinds in postcss.config.js
 *
 *
 * Commands:
 * - npm run build | builds uncompressed
 * - nmp run production | minimized compressed
 */
const path = require("path");
const glob = require("glob-all");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");

module.exports = (env) => ({
    /** Name the output file and set the publishing path */
    output: {
        path: path.resolve(env.dirname, `${env.dist}`),
        filename: "[name].js",
    },

    /** loading modules | loaders */
    module: {
        rules: [
            /** loading setup for CSS|SASS|POSTCSS */
            {
                test: /\.(sa|sc|c)ss$/,

                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    },

                    {
                        loader: "sass-loader",
                    },

                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                ident: "postcss",
                                // plugins: [require("tailwindcss"), require("autoprefixer")],
                            },
                        },
                    },
                ],
            },

            /** loading setup for JS with Babel*/
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                },
            },
        ],
    },

    /** Adding plugins */
    plugins: [
        /** Extracting the compiled embedded css to a seperate file */
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        // new MiniCssExtractPlugin(),

        /** Scanning files for used styles | id's and classes */
        new PurgecssPlugin({
            paths: glob.sync(
                [
                    "./index.php",
                    "./pages/**/*.php",
                    "./views/**/*.php",
                    // "./index.html",
                    // `${PATHS}/**/*.html`,
                ], { nodir: true }
            ),
        }),
    ],
});