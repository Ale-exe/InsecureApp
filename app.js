const express = require('express');
const app = express();
const port = 5000;
const html = require("./Routing/html_router");
const api = require('./Routing/api_router');

app.use(express.json());
app.use("/", html);
//app.use("/", css);
// app.use("/", js);
app.use("/", api);
// express.static is used here to handle static files like JS/CSS
app.use('/static', express.static('JS'));
app.use('/static', express.static('CSS'));
app.use('/Images', express.static('Images'));

app.listen(port, () => console.log(`Express app listening on port ${port}...`));
