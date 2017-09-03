import React from 'react'
import SelectShelf from './SelectShelf'

export default ({id, authors, title, imageLinks, shelf, onChangeShlef}) =>
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.smallThumbnail}")` }}
      />
      <SelectShelf bookId={id} onChangeShlef={onChangeShlef} selectedsShelf={shelf || ''} />
    </div>
    <div className="book-title">{title}</div>
    {authors && authors.map(author => <div className="book-authors">{author}</div>)}
  </div>



