const express = require('express');
const queries = require('../dbQueries')
let endpoint_router = express.Router();

endpoint_router.post('/getAddress', queries.getAddress);

module.exports = endpoint_router;

