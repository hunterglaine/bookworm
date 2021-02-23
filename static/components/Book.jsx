"use strict";

function Book(props) {

    let history = useHistory();

    // const showTitleAuthor = (evt) => {
    //     pass
    // }

    return (
        <Link to={`/book-details/${book.isbn}`}>
        <img src={props.book.image} className="book-cover" alt={props.book.title}/>
        </Link>
        // onMouseOver={showTitleAuthor}
    )
}