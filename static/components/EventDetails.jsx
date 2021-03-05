"use strict";

function EventDetails(props) {

    const {event} = props
    const [booksVotedFor, setBooksVotedFor] = React.useState([])
    const [eventsBooksVotes, setEventsBooksVotes] = React.useState([])
  
    let history = useHistory();

    React.useEffect(() => {
        fetch("/vote", {
            method: "GET"
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setBooksVotedFor(data)})
    }, [])

    const updateEventBooks = (eventId, type) => (evt) => {
        evt.preventDefault();

        fetch("/update-event-books", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({"event_id": eventId,
                                "update_type": type}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => props.setChangeInEvent(data["success"]))
        .then(() => props.setChangeInEvent(null))
    }

    const updateVote = (bookIsbn) => (evt) => {
        evt.preventDefault();
        console.log("this ran")
        
        fetch("/vote", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({"eventId": event.id,
                                "bookIsbn": bookIsbn}),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(result => {
            console.log("This is the result",result)
            setBooksVotedFor(result["booksVotedFor"]); 
            return result;
        })
        .then(data => {
            if ("error" in data) {
                alert(data["error"])
            }
            else {
                alert(data["success"])
                setEventsBooksVotes(data["allEventsBooks"])
            }
            console.log(data)
        })
    }

    return (
        (<div>
            <h2>On {event.event_date.slice(0,16)}, you are {props.type === "hosting" ? "hosting" : "attending"} a book club!</h2>
            {props.type === "hosting" ? null : <h3>Hosted by: {event.host}</h3>}
            <h3>Time: {event.start_time} to {event.end_time}</h3>
            <h3>Location: {event.city}</h3>
            {event.books === [] 
            ? null 
            : <div className="book-tile">
                <h3>Book Suggestions</h3>
                {event.books.map(book => 
                    // {eventsBooksVotes.map(eventBook => 
                    //     {eventBook.isbn === book.isbn && eventBook.is_the_one ? 
                    (<div className="event-book">
                        <Book key={book.isbn} book={book} setBookForDetails={props.setBookForDetails} categoryLabel="event" eventId={event.id} />
                        {event.can_vote 
                            ? <div>
                                {eventsBooksVotes.map(eventBook => 
                                    <div>
                                        {eventBook.isbn === book.isbn ? eventBook.vote_count : null}
                                    </div>
                                )}
                                <button className="vote" id={book.isbn} onClick={updateVote(book.isbn)}>
                                    {booksVotedFor[event.id] && booksVotedFor[event.id].includes(book.isbn) ? "Unvote" : "Vote"}
                                </button> 
                            </div> 
                            : null}
                    </div>)
                            // : null}
                        // )}
                )}
            </div>
            }
            {props.type === "hosting" ? 
            <div>
                {event.can_add_books 
                ? <div>
                        <button onClick={updateEventBooks(event.id, "suggest")}>
                            Stop Book Suggestions
                        </button>
                        <button onClick={() => history.push(`/user/${event.id}/${props.type}`)}>
                            Suggest a Book
                        </button>
                    </div> 
                        : <button onClick={updateEventBooks(event.id, "suggest")}>
                            Allow Book Suggestions
                        </button>
                }
                {event.can_vote 
                    ? <button onClick={updateEventBooks(event.id, "vote")}>
                        Stop the Voting
                    </button> 
                    : <button onClick={updateEventBooks(event.id, "vote")}>
                        Start the Voting
                    </button>
                }
            </div>
            : 
            <div>
            {event.can_add_books 
                ? <button onClick={() => history.push(`/user/${event.id}/${props.type}`)}>Suggest a Book</button> 
                : null}
            </div>
        }
        </div>)
    )
}