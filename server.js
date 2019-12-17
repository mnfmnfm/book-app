const express = require('express');
const superagent = require('superagent');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('potato'));

app.get('/', (req, res) => {
  let query = 'Of Mice And Men';
  if (req.query.potato) {
    query = req.query.potato;
  }
  superagent.get(`https://www.googleapis.com/books/v1/volumes/?q=${ query }`)
    .then( bookResponse => {
      // console.log(bookResponse);
      res.render('index', { books: bookResponse.body.items});
    } );
  
});

app.listen(process.env.PORT || 3000, () => {console.log('listening')});
