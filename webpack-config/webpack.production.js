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
const path = require('path');
const glob = require('glob-all');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin')

module.exports = (env) => ({

    /** Name the output file and set the publishing path */
    output: {
        filename: '[name].js',
        path: path.resolve(env.dirname, `${env.dist}`)
    },

    /** loading modules | loaders */
    module: {
        rules: [

            /** loading setup for CSS|SASS */
            {
                test: /\.s[ac]ss$/i,
                use: [

                    MiniCssExtractPlugin.loader,


                    {
                        loader: "css-loader"
                    },


                    {
                        loader: "sass-loader"
                    },


                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    }


                ]

            },

            /** loading setup for JS with Babel*/
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env"]
                }
            }

        ]
    },

    /** Adding plugins */
    plugins: [

        /** Extracting the compiled embedded css to a seperate file */
        new MiniCssExtractPlugin({

            filename: '[name].css',
            chunkFilename: '[id].css'

        }),

        /** Scanning files for used styles | id's and classes */
        new PurgecssPlugin({

            paths: glob.sync([
                "./index.php",
                "./pages/**/*.php",
                './views/a**/*.php'
            ])

        })

    ]


});
