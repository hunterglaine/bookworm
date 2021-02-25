"use strict";

function CategoryContainer(props) {
    
    const booksInCategory = []

    for (const book of props.books) {
        booksInCategory.push(<Book key={book.isbn} book={book} setBookForDetails={props.setBookForDetails} categoryLabel={props.label} />)
    }

    return ( 
        <div>
        <h1>{props.label}</h1>
        <div>{booksInCategory}</div>
        </div>
    )
}