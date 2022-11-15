'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const errorHandler = require('./middlewares/errorHandler');

// Handle CORS
const cors = require('cors');
app.use(cors());

// Convert every incoming request to JS objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '/public')));


// ====== API routes =======
app.use(require('./api'));


// Use top level error handler
app.use(errorHandler.useHandler);


const PORT = process.env.PORT || 3004;
const server = app.listen(PORT, async () => {
    console.log("Reno server is running at port", PORT);
});

module.exports = server;