const express = require('express');
const api = express.Router();

// ==== API routes binding ====
// api.use(require('./auth'));
api.use(require('./ride'));
api.use(require('./user'));



module.exports = api;