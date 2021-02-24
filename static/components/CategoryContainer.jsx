"use strict";

function CategoryContainer(props) {
    
    const booksInCategory = []
    console.log("These are books in CategoryContainer", props.books)

    for (const book of props.books) {
        booksInCategory.push(<Book key={book.isbn} book={book} setBookForDetails={props.setBookForDetails} />)
    }

    return ( 
        <div>
        <h1>{props.label}</h1>
        <div>{booksInCategory}</div>
        </div>
    )
}