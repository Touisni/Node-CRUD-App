const express = require('express');
const dotenv = require ('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const path = require('path');

const app = express();

const connectDB = require('./server/database/connection');

dotenv.config({path:'views/.env'});

const PORT = process.env.PORT || 3000;


//log requests

app.use(morgan('tiny'));

//mongoDB connection

connectDB();


//parse request to body-parser

app.use(bodyParser.urlencoded({extended : true}));

//set view engine

app.set("view engine","ejs");

//app.set("views",path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css', express.static (path.resolve(__dirname,"assets/css")));
app.use('/img', express.static (path.resolve(__dirname,"assets/img")));
app.use('/js', express.static (path.resolve(__dirname,"assets/js")));

//css/style.css

/*app.get('/', (req,res) => {
//    res.render('index');
//});

//app.get('/add-user', (req,res) => {
   // res.render('add_user');
//});

//app.get('/update-user', (req,res) => {
  //  res.render('update_user');
//});*/


//load routers

app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{ 
    console.log('server is running');
});
