const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//
module.exports = {
    mode: 'development',

    /** Set the input file entry */

    /**    entry: './src/index.js', */

    /**
     * The entry point can also be an array with a path resolve
     */

entry: {
'main': [
//        path.resolve(__dirname, './src/index.js')
    path.resolve(__dirname, './src/file1.js'),
    path.resolve(__dirname, './src/file2.js')
],
//        'outputfile_name_css': [
//            path.resolve(__dirname, './src/style.css'),
//        ],

},

    /** Name the output file and set the publishing path */
output: {

    /* The output file can be given a hard coded name or use '[name]' 
     * to refer to the property name given in 'entry' */
//        filename: '[name].js',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
},
    /** loading modules | loaders */
    module: {
        rules: [
            /** 
             * To load styles, the style-loader is needed. 
             * Next to teh style loader we'll need the loader for the type of file
             * css-loader for css
             * sass-loaders for scss
             * */

            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
//                use: ['style-loader', 'sass-loader']
//                 use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
//            {
//                test: /\.s[ac]ss$/i,
//                use: [
//                    // Creates `style` nodes from JS strings
//                    'style-loader',
//                    // Translates CSS into CommonJS
//                    'css-loader',
//                    // Compiles Sass to CSS
//                    'sass-loader',
//                ],
//            },
        ]
    },

    plugins: [new MiniCssExtractPlugin()],
};