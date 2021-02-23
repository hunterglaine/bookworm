"use strict";

function Book(props) {

    let history = useHistory();

    // const showTitleAuthor = (evt) => {
    //     pass
    // }

    const goToDetails = () => {
        props.setBookForDetails(props.book)
        history.push("/book-details")
    }

    return (
        <img src={props.book.image} className="book-cover" alt={props.book.title} onClick={goToDetails} />
        // onMouseOver={showTitleAuthor}
    )
}