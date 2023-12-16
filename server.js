const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

dotenv.config({ path: 'views/.env' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('tiny'));
connectDB();
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

app.use('/', require('./server/routes/router'));

app.listen(PORT, () => {
    console.log('Server is running');
});
