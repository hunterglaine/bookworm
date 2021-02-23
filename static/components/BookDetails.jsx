"use strict";

function BookDetails(props) {
    
    // fetch("/api/book-details")
    
    return (
        <div>
            <img src={props.bookForDetails.image} alt={props.bookForDetails.title}/>
            <h2>{props.bookForDetails.title}</h2>
            <p>Written By {props.bookForDetails.author}</p>
            <p>Number Of Pages: {props.bookForDetails.page_length}</p>
            <p>{props.bookForDetails.description}</p>
        </div>
    )
}