const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();



// settings
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname, 'public')));

