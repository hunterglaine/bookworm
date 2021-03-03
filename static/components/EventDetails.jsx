"use strict";

function EventDetails(props) {

    let { type } = useParams();
    const [booksVotedFor, setBooksVotedFor] = React.useState([])

    const updateEventBooks = (eventId, type) => (evt) => {
        evt.preventDefault();

        fetch("/api/update-event-books", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({"event_id": eventId,
                                "update_type": type}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => setChangeInEvent(data["success"]))
        .then(() => setChangeInEvent(null))
    }


    const updateVote = (bookIsbn) => (evt) => {
        evt.preventDefault();
        console.log()
        
        fetch("/api/vote", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({"eventId": props.eventForDetails.id,
                                "bookIsbn": bookIsbn}),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(result => {
            setBooksVotedFor(result["booksVotedFor"]); 
            return result;
        })
        .then(data => {
            if ("error" in data) {
                alert(data["error"])
            }
            else {
                alert(data["success"])
            }
            console.log(data)
        })
    }

    return (
        (<div>
            <h2>On {props.eventForDetails.event_date.slice(0,16)}, you are {type === "hosting" ? "hosting" : "attending"} a book club!</h2>
            {type === "hosting" ? null : <h3>Hosted by: {props.eventForDetails.host}</h3>}
            <h3>Time: {props.eventForDetails.start_time} to {props.eventForDetails.end_time}</h3>
            <h3>Location: {props.eventForDetails.city}</h3>
            {props.eventForDetails.books === [] 
            ? null 
            : <div className="book-tile">
                <h3>Book Suggestions</h3>
                {props.eventForDetails.books.map(book => 
                    (<div className="event-book">
                        <Book key={book.isbn} book={book} setBookForDetails={props.setBookForDetails} categoryLabel="event" eventId={props.eventForDetails.id} />
                        {props.eventForDetails.can_vote 
                        ? <div>
                            <p>Vote Count</p>
                            {console.log("The books isbn", book.isbn)} 
                            {console.log("The list of books voted for", booksVotedFor)}
                            {console.log("Is the isbn in the list of books voted for?", booksVotedFor.includes(book.isbn))}
                            {console.log("The event id", props.eventForDetails.id)}
                            {console.log("Is the event id in the list of books voted for?", booksVotedFor.includes(props.eventForDetails.id))}
                            <button className="vote" id={book.isbn} onClick={updateVote(book.isbn)} >{booksVotedFor.includes(props.eventForDetails.id) && booksVotedFor.includes(book.isbn) ? "Unvote" : "Vote"} </button>
                        </div> 
                        : null}
                    </div>)
                    )
                }
            </div>
            }
            {type === "hosting" ? 
            <div>
                {props.eventForDetails.can_add_books 
                ? <div>
                        <button onClick={updateEventBooks(props.eventForDetails.id, "suggest")}>
                            Stop Book Suggestions
                        </button>
                        <button onClick={() => history.push(`/user/${props.eventForDetails.id}`)}>
                            Suggest a Book
                        </button>
                    </div> 
                        : <button onClick={updateEventBooks(props.eventForDetails.id, "suggest")}>
                            Allow Book Suggestions
                        </button>
                }
                {props.eventForDetails.can_vote 
                    ? <button onClick={updateEventBooks(props.eventForDetails.id, "vote")}>
                        Stop the Voting
                    </button> 
                    : <button onClick={updateEventBooks(props.eventForDetails.id, "vote")}>
                        Start the Voting
                    </button>
                }
            </div>
            : 
            <div>
            {props.eventForDetails.can_add_books 
                ? <button onClick={() => history.push(`/user/${props.eventForDetails.id}`)}>Suggest a Book</button> 
                : null}
            </div>
        }
        </div>)
    )
}