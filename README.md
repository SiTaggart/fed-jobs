#Node Quick Start
A quick start app structure I can use to get a node site up and running. Inspired by Yeoman and Mimosa and the like, but less cruft.

##Built with
Express and Jade templating. Bower for ui Package management. Grunt task to build SASS files and lint js files, concat using require, minify etc.

##Run with
`$ node app`

I use LiveReload anyway so keep that seperate.

##Usage
Make sure you have node, npm, grunt and bower installed globally.

Clone the repo and run the following before you run the app server. This will install everything an get latest dependancies:

`$ npm install`

`$ grunt setapp`

##Production
To ensure your website is fully awesome, run the production task in grunt to minify everything

`$ grunt production`

###TODO
- Image compression in production