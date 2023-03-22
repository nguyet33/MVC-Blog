# tech-blog
a blog where users can write about their tech discoveries 

## Description

This is a full stack application where you are able to login and sign up for an blog account. After signing up or logging in you are then able to go to your dashbaord where you can create a new blog post or edit/delete an existing blog post. If you would like to see all blogpost including post created by other users you can go to the homepage which will display all blog post. You are also able to go into another users blogpost and create a comment.

What I learn from this project is the use of express with handlebars and sessions. I also learned to use sequelize with models and associations to create my tables. I incorporated the package bcrypt so I can secure my users login password in my database as well. With handle bars I learned how to render the handle bars and pass in data to the handle bars so I can use hooks to help me display data. 

## Installation

After cloning all the files from the respository you would need to install a few packages to be able to run this application. First you will need to install mysql into your computer. Then You would need node.js, mysql2.js, sequelize, dotenv, express, express-handlebar, express-session, connectisession-sequelize, and bcrypt. With the included package.json file in the repository you would only need to run "npm install" after installing node.js into your local machine. You will also need to create your on .env file with the format  

DB_NAME='databasename'
DB_PASSWORD='mysql password'
DB_USER='mysql user name'
SESSION_SECRET='crypt key'

## Usage
- install mysql
- install node.js
- install mysql2
- install sequelize
- install dotenv
- install express 
- install express-handlebars
- install express-session
- install connect-session-sequelize
- install bcrypt
- run schema.sql
- run node server.js in the root folder to start the server
- go to localhost:3000 or if you deployed it to a server go to the live page
- click on login where you can login or sign up 
- go to dashboard in the navigate and click create post. Create a post
- go back to dashboard click on the blogpost title to edit a post
- go to home page, click on the title of a blogpost to comment on a blogpost or view comments on the post


[link to live page](https://jackiestechblog.herokuapp.com)


## Credits

N/A

## License

N/A

---


## Features

Users are able to login and sign up for an account on the website. Users are then able to create and edit a blog post in the dashboard. Users are able to comment and view comments of a blog post in the home page 