"use strict";

function BookDetails(props) {
    const { book } = props
    return (
        <h2>This is the book detail page for {book.title}</h2> 
    )
}