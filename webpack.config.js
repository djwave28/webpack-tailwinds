const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin')
var glob = require('glob-all');


const PATHS = {
    src: path.join(__dirname, 'src'),
    views: path.join(__dirname, 'views'),
}

//
module.exports = {
    mode: 'development',


    /**
     * The entry point can also be an array with a path resolve
     */

    entry: {
        'main': [
            path.resolve(__dirname, './src/index.js')
        ],
    },

    /** Name the output file and set the publishing path */
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },

    /** loading modules | loaders */
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [

                    MiniCssExtractPlugin.loader,


                    { loader: "css-loader" },


                    { loader: "sass-loader" },


                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    },


                ]

            },
        ]
    },

    /** Adding plugins */
    plugins: [

        /** Extracting the compiled embedded css to a seperate file */
        new MiniCssExtractPlugin({

            filename: '[name].css',
            chunkFilename: '[id].css',

        }),

        /** Scanning files for used styles | id's and classes */
        new PurgecssPlugin({

            paths: glob.sync([
                `${PATHS.src}/**/*`,
                './index.php',
                `${PATHS.views}/**/*.php`
            ]),

        }),

    ],

};