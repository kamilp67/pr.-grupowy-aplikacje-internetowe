
const path = require('path');


const books = [
    { id: 0, title: "Drakula", author: "Bram Stoker", price: 10.99, imgUrl: './imgs/drakula.jpg' },
    { id: 1, title: "Behawiorysta", author: "Remigiusz Mróz", price: 8.99, imgUrl: './imgs/behawiorysta.jpg' },
    { id: 2, title: "Dwie wieże", author: "J.R.R. Tolkien", price: 11.99, imgUrl: './imgs/dwie-wieze.jpg' },
    { id: 3, title: "Jobs", author: "Walter Isaacson", price: 11.99, imgUrl: './imgs/jobs.jpg' },
    { id: 4, title: "Out", author: "Natsu Kirimo", price: 11.99, imgUrl: './imgs/out.jpg' },
    { id: 5, title: "Solaris", author: "Stanisław Lem", price: 11.99, imgUrl: './imgs/solaris.jpg' },
    { id: 6, title: "Szklany Klosz", author: "Sylvia Plath", price: 11.99, imgUrl: './imgs/szklany-klosz.jpg' },
    { id: 7, title: "Ziemiomorze", author: "Ursula K. Le Guin", price: 11.99, imgUrl: './imgs/ziemiomorze.jpg' },
    // { id: 8, title: "Miasteczko Salem", author: "Stephen King", price: 11.99, imgUrl: '../imgs/miasteczko-salem.jpg' }
  ];


exports.getAllBooks = async (req, res) => {
    try {
      res.send(books)

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
}; 

exports.getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = books[bookId]

        if (!book) {
          res.status(404).send('Item not found');
        } else {
          res.json(book)
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getBookImg = async (req, res) => {
  const id = req.params.id
  // console.log(id);

  try {
    const imgPath = path.join(__dirname, books[id].imgUrl);
    res.sendFile(imgPath)
  } catch(error) {
    res.status(500).send(error)
  }
}