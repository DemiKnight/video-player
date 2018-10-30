/*
* Using template from [1] to get started with express
*
* Expressjs (2018) [online] <http://expressjs.com/en/starter/hello-world.html>
* */
const express = require('express');
const app = express();
const port = 3000;

/*Serve the html files to the web*/
app.use(express.static('www'));

/**/
app.get('/',
    (req, res) => res.send('Hello World!')
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
