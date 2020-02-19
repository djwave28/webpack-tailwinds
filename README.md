# webpack-tailwinds


Webpack configurations with Tailwinds + PHP


There are two configuration files in this repo. 

- webpack.development.js
- webpack.production.js


## webpack.development
To run webpack in a PHP environment, such environment must be provided with a webserver like Apache.

The  configuration file webpack.development.js is configured with:

- Babel
- Sass
- PostCSS
- devServer
- Chokidar File Watcher

The development config will launch the DevServer in teh memory (RAM).
To run the devServer with PHP, the domain needs to be to a running PHP config.

In this example file a server is set up with domain `webpack-tailwinds.local`. Change this to match your domain.



## webpack.production
The  configuration file webpack.production.js is configured with:

- Babel
- Sass
- PostCSS
- PurgeCSS

This configuration is building the files. in the `./dist` folder. The production connfig is missing the `devServer`, but does have the PurgeCSS feature to scrape the unneeded CSS.

