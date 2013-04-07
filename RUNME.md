#FED-JOBS
A node project, run on Heroku with a web process and scheduled worker to gather new jobs from the feeds. A list of feeds this project uses is available in the root file feeds.js. I'm using the Twitter handle as an ID in feed_id.

##Built with
Express and Jade templating. Bower for ui Package management. MongoDB for storing the jobs. Grunt task to build SASS files and lint js files, concat using require, minify etc. Uses Foreman to run the site.
In development environment the app spawns a child process to run a grunt task while you are coding. I haven't included LiveReload into that task, as I failed miserably in getting it to work.

##Usage
Make sure you have node, npm, grunt and bower installed globally. Also make sure you have MongoDB installed and the server running.

Clone the repo and run the following before you run the app server. This will install everything an get latest dependancies:

`$ npm install`

`$ grunt setapp`

##Production
To ensure the website is fully awesome, run the production task in grunt to minify everything before deploying.

`$ grunt production`

##Run with
`$ foreman start`
