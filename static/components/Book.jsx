"use strict";

function Book(props) {

    let history = useHistory();

    const goToDetails = () => {
        props.setBookForDetails(props.book)
        history.push(`/book-details/${props.categoryLabel}/${props.eventId}`)
    }

    return (
        <img src={props.book.image} className="book-cover" alt={props.book.title} onClick={goToDetails} />
    )
}

className="d-inline-block w-5" 