# webpack-tailwinds (webpack 5)

## intro
Some basic knowledge is assumed. This repository is the basis for a webpack 5 project with PHP.

## Basics:
The main configuration file `webpack.config.js` is merged with the config file that is determined in the `package.json` file.

There are two script options in the `package.json`:
- watch     | development
- build     | production

## Note
Each is individually called by the "`--env config`" environment variable in the run script of the `package.json` file. It is common to use the `mode` flag for this, but setting a seperate flag `config` allows for loading your own custom file, which allows for development without altering the original `config` file.


## Webpack and PHP
To run webpack in combination with PHP, use a suitable server platform like Apache and set up a virtual host.  
Used example: *webpack-tailwinds.local.com.*


## Tailwinds
To set up Tailwinds in webpack, create a `postcss.config.js` file with the following:

```js
module.exports = {
    plugins: {
        "postcss-import": {},
        "tailwindcss/nesting": {},
        tailwindcss: {},
        autoprefixer: {},
    },
};
```

## webpack.config.js
Customize the source, destination, domain and port for your project
  - env.src = "src";
  - env.dist = "dist";
  - env.domain = "webpack-tailwinds.local.com";
  - env.port = "8080";


## webpack.development.js

The development configuration is set up with the following components:

- Babel
- Sass
- PostCSS (autoprefixer)
- devServer
- Chokidar File Watcher

The development envoriment is called by running the `watch` script.
```sh
npm run watch
```

The development environment will launch the DevServer on the defined port (8080) inside RAM memory. 


## webpack.production.js
The production environment is configure with the following components:

- Babel
- Sass
- PostCSS (autoprefixer)
- PurgeCSS

The production environment is run with the command:
```sh
npm run build
```

### Note:   
Tailwinds will only load the classes that are actually used and purges all unnescesary bagage from its own library. The use of the PurgeCSS modules will purge any CSS definition in the stylesheet files that are not actually used.



Visit [Tailwinds.com](https://tailwindcss.com/)
