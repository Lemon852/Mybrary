const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const author = require("../models/author");

//all the author router
router.get("/", async (req, res) => {


  //req.query is used for get request while
  // req.body is used for post request.
  //RegExp(regular expression will help us to search for items without completing the word/text)
  let searchOptions = {}
  if(req.query.name != null && req.query.name !==''){
    searchOptions.name = new RegExp(req.query.name, 'i')
  }

  try{
    const authors = await Author.find(searchOptions)
    res.render("authors/index.ejs", {
      authors:authors,
      searchOptions: req.query
    })
  }catch{
    res.redirect('/')
  }
});

// all the new author router
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//create new author router
router.post('/', async (req, res) => {
  const author = new Author
  ({
    name: req.body.name, //we wamt to make sure which item to send

  })
  try{
    const newAuthor = await author.save()
    res.redirect("authors");
  }catch{
      res.render("authors/new",{
        author: author,
        errorMessage: 'Error creating Author!'
      })
    }
})

module.exports = router;
