"use strict";

function UserEvents(props) {

    const [myEvents, setMyEvents] = React.useState({})
    const [changeInEvent, setChangeInEvent] = React.useState(null)
    
    

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
                console.log("It's doing this...")
            }
        })
    }, [changeInEvent])

    // const updateEventBooks = (eventId, type) => (evt) => {
    //     evt.preventDefault();

    //     fetch("/api/update-event-books", {
    //         method: "POST",
    //         credentials: "include",
    //         body: JSON.stringify({"event_id": eventId,
    //                             "update_type": type}),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     })
    //     .then(response => response.json())
    //     .then(data => setChangeInEvent(data["success"]))
    //     .then(() => setChangeInEvent(null))
    // }


    // const updateVote = (eventId, bookIsbn) => (evt) => {
    //     evt.preventDefault();
    //     console.log()
        
    //     fetch("/api/vote", {
    //         method: "POST",
    //         credentials: "include",
    //         body: JSON.stringify({"eventId": eventId,
    //                             "bookIsbn": bookIsbn}),
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //     })
    //     .then(response => response.json())
    //     .then(result => {
    //         setBooksVotedFor(result["booksVotedFor"]); 
    //         return result;
    //     })
    //     .then(data => {
    //         if ("error" in data) {
    //             alert(data["error"])
    //         }
    //         else {
    //             alert(data["success"])
    //         }
    //         console.log(data)
    //     })
    // }

    return (
        <div>
            <Link to="/create-event">
                Create a New Book Club Event
            </Link>
            <h1>Book Club Meetings You Are Hosting</h1>
            {myEvents.hosting 
                ? myEvents.hosting.map(event => 
                <Event event={event} type="hosting" setEventForDetails={props.setEventForDetails} />
                ) 
                : "You are not currently hosting any events"
            }
            <h1>Book Club Meetings You Are Attending</h1>
            {myEvents.attending 
                ? myEvents.attending.map(event => 
                <Event event={event} type="attending" setEventForDetails={props.setEventForDetails} />
                ) 
                : "You are not currently attending any events"
            }
        </div>
    )
}