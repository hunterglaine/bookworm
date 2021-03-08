"use strict";

function Book(props) {

    let history = useHistory();

    const goToDetails = () => {
        props.setBookForDetails(props.book)
        history.push(`/book-details/${props.categoryLabel}/${props.eventId}`)
    }

    return (
        <div className="book-cover">
            <img src={props.book.image} alt={props.book.title} onClick={goToDetails} />
        </div>     
    )
}

// className="d-inline-block w-5" 