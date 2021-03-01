"use strict";

function UserEvents(props) {

    const [myEvents, setMyEvents] = React.useState({})
    const [changeInEvent, setChangeInEvent] = React.useState(null)
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

    const allowSuggestions = (event_id, type) => (evt) => {
        evt.preventDefault();

        fetch("/api/update-event-books", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({"event_id": event_id,
                                "update_type": type}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => setChangeInEvent(data["success"]))
        .then(() => setChangeInEvent(null))
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
                        <h3>Location: {event.city}</h3>
                        {event.can_add_books ? 
                            <div>
                                <button onClick={allowSuggestions(event.id, "suggest")}>
                                    Stop Book Suggestions
                                </button>
                                <button onClick={() => history.push(`/user/${event.id}`)}>
                                    Suggest a Book
                                </button>
                            </div> :
                                <button onClick={allowSuggestions(event.id, "suggest")}>
                                    Allow Book Suggestions
                                </button>}
                        {/* <button onClick={allowSuggestions(event.id, "suggest")}>
                        //     {event.can_add_books ? "Stop Book Suggestions" : "Allow Book Suggestions"}
                        // </button> */}
                    </div>)) : "You are not currently hosting any events"
                }
            <h1>Book Club Meetings You Are Attending</h1>
            {myEvents.attending ? myEvents.attending.map(event => 
                    (<div>
                        <h2>On {event.event_date}, you are attending a book club!</h2>
                        <h3>Location: {event.city} </h3>
                        {event.can_add_books ? <button onClick={() => history.push(`/user/${event.id}`)}>Suggest a Book</button> : null}
                    </div>)) : "You are not currently attending any events"
                }
        </div>
    )
}