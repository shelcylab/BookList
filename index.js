const express = require('express');
const uuid = require('uuid');

let bookList = require('./data/book');

const app = express();

//set a middleware to parse dat
app.use(express.json());

app.get('/', (req, res) => {
  try {
    res.send(bookList);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.get('/:id', (req, res) => {
  try {
    const book = bookList.find((t) => t.id == req.params.id);
    if (!book) {
      return res.status(404).send('task not found');
    }
    res.send(book);
  } catch (err) {
    res.status(500).send('Server error');
  }
});




app.post('/', (req, res) => {
  try {
    const addBook = {
      id: uuid.v4(),
      name: req.body.name,
      author: req.body.author,
      subject: req.body.subject,
    };
    bookList.push(addBook);
    res.send(addBook);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.delete('/', (req, res) => {
  try {
    const book = bookList.find((t) => t.id == req.body.id);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    bookList = bookList.filter((t) => t.id !== req.body.id);
    res.send(bookList);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.put('/', (req, res) => {
  try {
    const book = bookList.find((t) => t.id == req.body.id);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    const id = req.body.id;
    const name = req.body.name;
    const author = req.body.author;
    const subject = req.body.subject;
    bookList = bookList.filter((t) => {
      if (t.id == id) {
        t.name = name;
        t.author = author;
        t.subject = subject;
      }
      return t;
    });

    res.send(bookList);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.listen(5003, () => {
  console.log('Server started');
});