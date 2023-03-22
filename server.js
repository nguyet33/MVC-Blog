require('dotenv').config();
const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const allRoutes = require('./controllers');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;


//creates a session

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge:1000*60*60*2
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};


app.use(session(sess));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//uses static public folder
app.use(express.static('public'));

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//uses routers
app.use(allRoutes);

//starts the server and sequelize
sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});