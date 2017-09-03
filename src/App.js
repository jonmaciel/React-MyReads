import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import Search from './containers/Search'
import BookList from './containers/BookList'
import './index.css'

const normalizeBooks = (books) => {
  let normalizedBooks = {};
  books.forEach(book => normalizedBooks[book.id] = book)
  return normalizedBooks
}

class BooksApp extends React.Component {
  state = {books: undefined}

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: normalizeBooks(books) })
    })
  }

  addBook = book => {
    const books = {...this.state.books}
    books[book.id] = book
    this.setState({ books })
  }

  changeShelf = (bookID, newShelf) => {
    BooksAPI.update(bookID, newShelf).then(r => {
      if(newShelf !== 'none' && !r[newShelf].includes(bookID)) return;
      let books = {...this.state.books}
      books[bookID].shelf = newShelf
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() =>
          <BookList changeShelf={this.changeShelf} books={this.state.books} />
        } />
        <Route path="/search" render={() =>
          <Search addBook={this.addBook} shelfBooks={this.state.books}/>
        } />
      </div>
    )
  }
}

export default BooksApp
