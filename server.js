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
  let type = 'title';
  if (req.query.tomato) {
    type = req.query.tomato;
  }
  superagent.get(`https://www.googleapis.com/books/v1/volumes/?q=${ query }+in${type}`)
    .then( bookResponse => {
      // console.log(bookResponse);
      res.render('index', { books: bookResponse.body.items});
    } );
  
});

app.listen(process.env.PORT || 3000, () => {console.log('listening')});
