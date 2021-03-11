"use strict";

function EventDetails(props) {
    
    const {event} = props
    const [booksVotedFor, setBooksVotedFor] = React.useState([])
    const [eventsBooksVotes, setEventsBooksVotes] = React.useState([])
    // console.log("START", event.start_time)
    // console.log("END", event.end_time)
    // // var timeString = date.toLocaleString('en-US', options)
    // let eventStart = new Date(event.start_time).toLocaleTimeString("en-US", {hour: '2-digit', minute:'2-digit'})
    // console.log("EVENTSTART", eventStart)
    // let eventEnd = new Date(event.end_time).toLocaleTimeString("en-US", {hour: '2-digit', minute:'2-digit'})
    // console.log("EVENTEND", eventEnd)
  
    let history = useHistory();

    React.useEffect(() => {
        fetch("/vote", {
            method: "GET"
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(" What is going on here???",data)
            setBooksVotedFor(data["booksVotedFor"])
            setEventsBooksVotes(data["eventsBooks"])
        })
    }, [])
    // [props.changeInEvent]

    React.useEffect(() => {

    }, [])
    
    const updateEventBooks = (eventId, type) => (evt) => {
        evt.preventDefault();

        fetch("/event-books", {
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
            setBooksVotedFor(result["booksVotedFor"]);
            // props.setChangeInEvent(result)
            // props.setChangeInEvent(null)
            return result;
        })
        .then(data => {
            if ("error" in data) {
                alert(data["error"])
            }
            else {
                alert(data["success"])
                setEventsBooksVotes(data["allEventsBooks"])
                // allEventsBooks = data.allEventsBooks
                // setEventsBooksVotes(eventsBooksVotes.filter((eventBook) => eventBook.vote_count !== data.allEventsBooks[0].vote_count).concat([data.allEventsBooks[0]]))
                // props.setChangeInEvent(data)
                // props.setChangeInEvent(null)
            }
            console.log(data)
        })
    }

    return (
        (<Card className="card-color">
            <h3>On {event.event_date.slice(0,16)}, you are {props.type === "hosting" ? "hosting" : "attending"} a book club!</h3>
            {props.type === "hosting" ? null : <p><strong>Hosted by:</strong> {event.host}</p>}
            <p><strong>Time:</strong> {event.start_time} to {event.end_time}</p>
            <p><strong>Location:</strong> {event.city}</p>
            {event.books === [] 
            ? null 
            : <div className="book-tile">
                {event.books.length === 1 ? <h4>We're Reading</h4> : <h4>Book Suggestions</h4>}
                {event.books.map(book => 
                    // {eventsBooksVotes.map(eventBook => 
                    //     {eventBook.isbn === book.isbn && eventBook.is_the_one ? 
                    (<div className="event-book">
                        <Card className="text-center" border="light" className="card-color">
                        <Book key={book.isbn} book={book} setBookForDetails={props.setBookForDetails} categoryLabel="event" eventId={event.id} />
                        {event.can_vote 
                            ? <div>
                                {eventsBooksVotes.map(eventBook => 
                                    <div>
                                        {eventBook.isbn === book.isbn ? eventBook.vote_count : null}
                                    </div>
                                )}
                                {/* {eventsBooksVotes.map(eventBook => 
                                    // {eventBook.id === event.id 
                                    // ?
                                    {eventBook.events_books.map(bookChoice =>
                                    <div>
                                        {console.log("checking vote count", bookChoice.isbn, book.isbn, bookChoice.vote_count)}
                                        {bookChoice.isbn === book.isbn ? bookChoice.vote_count : null}
                                    </div>
                                 )} 
                                :
                                null}
                                 )}*/}
                                <Button className="button" id={book.isbn} onClick={updateVote(book.isbn)}>
                                    {booksVotedFor[event.id] && booksVotedFor[event.id].includes(book.isbn) ? "Unvote" : "Vote"}
                                </Button> 
                            </div> 
                            : null}
                        </Card>
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
                    <Button className="button" onClick={updateEventBooks(event.id, "suggest")}>
                        Stop Book Suggestions
                    </Button>
                    <Button className="button" onClick={() => history.push(`/user/${event.id}/${props.type}`)}>
                        Suggest a Book
                    </Button>
                </div> 
                : <Button className="button" onClick={updateEventBooks(event.id, "suggest")}>
                    Allow Book Suggestions
                </Button>
                }
                {event.can_vote /*&& !event.can_add_books */
                    ? <Button className="button" onClick={updateEventBooks(event.id, "vote")}>
                        Stop the Voting
                    </Button> 
                    : <Button className="button" onClick={updateEventBooks(event.id, "vote")}>
                        Start the Voting
                    </Button>
                }
            </div>
            : 
            <div>
            {event.can_add_books 
                ? <Button className="button" onClick={() => history.push(`/user/${event.id}/${props.type}`)}>Suggest a Book</Button> 
                : null}
            </div>
        }
        </Card>)
    )
}