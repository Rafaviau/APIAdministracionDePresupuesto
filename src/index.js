const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();



// settings
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// start the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
  });

// routes
app.use('/api/operations', require('../routes/routes'));
app.use('/api/operations/NewForm', require('../routes/routes'));