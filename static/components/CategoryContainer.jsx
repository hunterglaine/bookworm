"use strict";

function CategoryContainer(props) {
    
    const booksInCategory = []

    for (const book of props.books) {
        booksInCategory.push(<Book key={book.isbn} book={book} />)
    }

    return ( 
        <div>
        <h1>{props.title}</h1>
        <div>{booksInCategory}</div>
        </div>
    )
}