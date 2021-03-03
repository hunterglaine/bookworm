"use strict";

function UserEvents(props) {

    const [myEvents, setMyEvents] = React.useState({})
    const [changeInEvent, setChangeInEvent] = React.useState(null)
    const [booksVotedFor, setBooksVotedFor] = React.useState([])
    let history = useHistory();

    React.useEffect(() =>  {
        fetch("/api/user-events")
        .then(response => response.json())
        .then(data => {
            if ("error" in data) {
                alert(data["error"]);
                history.push("/login");
            }
            else {
                setMyEvents(data)
            }
        })
    }, [changeInEvent])

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


    const updateVote = (eventId, bookIsbn) => (evt) => {
        evt.preventDefault();
        console.log()
        
        fetch("/api/vote", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({"eventId": eventId,
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
        <div>
            <Link to="/create-event">
                Create a New Book Club Event
            </Link>
            <h1>Book Club Meetings You Are Hosting</h1>
            {myEvents.hosting ? myEvents.hosting.map(event => 
                    (<div>
                        <h2>On {event.event_date.slice(0,16)}, you are hosting a book club!</h2>
                        <h3>Time: {event.start_time} to {event.end_time}</h3>
                        <h3>Location: {event.city}</h3>
                        {event.books === [] 
                        ? null 
                        : <div className="book-tile">
                            <h3>Book Suggestions</h3>
                            {event.books.map(book => 
                                (<div className="event-book">
                                    <Book key={book.isbn} book={book} setBookForDetails={props.setBookForDetails} categoryLabel="event" eventId={event.id} />
                                    {event.can_vote 
                                    ? <div>
                                        <p>Vote Count</p>
                                        {console.log("The books isbn", book.isbn)} 
                                        {console.log("The list of books voted for", booksVotedFor)}
                                        {console.log("Is the isbn in the list of books voted for?", booksVotedFor.includes(book.isbn))}
                                        {console.log("The event id", event.id)}
                                        {console.log("Is the event id in the list of books voted for?", booksVotedFor.includes(event.id))}
                                        <button className="vote" id={book.isbn} onClick={updateVote(event.id, book.isbn)} >{booksVotedFor.includes(event.id) && booksVotedFor.includes(book.isbn) ? "Unvote" : "Vote"} </button>
                                    </div> 
                                    : null}
                                </div>)
                                )
                            }
                        </div>
                        }
                        {event.can_add_books ? 
                            <div>
                                <button onClick={updateEventBooks(event.id, "suggest")}>
                                    Stop Book Suggestions
                                </button>
                                <button onClick={() => history.push(`/user/${event.id}`)}>
                                    Suggest a Book
                                </button>
                            </div> :
                                <button onClick={updateEventBooks(event.id, "suggest")}>
                                    Allow Book Suggestions
                                </button>
                        }
                        {event.can_vote ?
                            <button onClick={updateEventBooks(event.id, "vote")}>
                                Stop the Voting
                            </button> :
                            <button onClick={updateEventBooks(event.id, "vote")}>
                                Start the Voting
                            </button>
                        }
                    </div>)) : "You are not currently hosting any events"
                }
            <h1>Book Club Meetings You Are Attending</h1>
            {myEvents.attending ? myEvents.attending.map(event => 
                    (<div>
                        <h2>On {event.event_date.slice(0,16)}, you are attending a book club!</h2>
                        <h3>Hosted by: {event.host}</h3>
                        <h3>Time: {event.start_time} to {event.end_time}</h3>
                        <h3>Location: {event.city} </h3>
                        {event.books === [] ? null : 
                        <div className="book-tile">
                            <h3>Book Suggestions</h3>
                            {event.books.map(book =>
                                (<div className="event-book">
                                    <Book key={book.isbn} book={book} setBookForDetails={props.setBookForDetails} categoryLabel="event" eventId={event.id} />
                                    {event.can_vote 
                                    ? <div>
                                        <button className="vote" id={book.isbn} onClick={updateVote(event.id, book.isbn)} >{booksVotedFor.includes(book.isbn) ? "Unvote" : "Vote"} </button>
                                    </div> 
                                    : null}
                                </div>)
                                )
                            }
                        </div>
                        }
                        {event.can_add_books ? <button onClick={() => history.push(`/user/${event.id}`)}>Suggest a Book</button> : null}
                    </div>)) : "You are not currently attending any events"
                }
        </div>
    )
}