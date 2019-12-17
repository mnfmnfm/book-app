const express = require('express');
const superagent = require('superagent');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('potato'));

app.get('/', (req, res) => {
  superagent.get(`https://www.googleapis.com/books/v1/volumes/?q=${ 'Of Mice And Men' }`)
    .then( bookResponse => {
      // console.log(bookResponse);
      res.render('index', { books: bookResponse.body.items});
    } );
  
});

app.listen(3000, () => {console.log('listening')});