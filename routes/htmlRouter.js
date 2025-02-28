const express = require('express');
const path = require('path');

let html_router = express.Router();

html_router
    .get('/', function(req, res) {
        res.sendFile((path.resolve('./public/html/addressFinderMainPage.html')));
    })

module.exports = html_router;
