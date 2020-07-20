express = require('express');
app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var http = require('http').createServer(app);
var cors = require('cors');
var fetch = require('node-fetch');
app.use(cors());

app.get('/helloworld/:country', async function (req, res) {
  let api_base = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${req.params.country}`;
     let response = await fetch(`${api_base}`);
    let feed = await response.json();
    res.status(200).json({
              title: feed.parse.title,
              content: feed.parse.text['*']
            });
})



http.listen(3005, () => {
  console.log(`Node server started on port : ${http}`);
});
