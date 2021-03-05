"use strict";

function UserEvents(props) {

    const [myEvents, setMyEvents] = React.useState({})
    const [changeInEvent, setChangeInEvent] = React.useState(null)

    React.useEffect(() =>  {
        fetch("/user-events")
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

    return (
        <div>
            <Link to="/create-event">
                Create a New Book Club Event
            </Link>
            <h1>Book Club Meetings You Are Hosting</h1>
            {myEvents.hosting 
                ? myEvents.hosting.map(event => 
                <EventDetails event={event} type="hosting" setChangeInEvent={setChangeInEvent} setBookForDetails={props.setBookForDetails} />
                // <Event event={event} type="hosting" setEventForDetails={props.setEventForDetails} />
                ) 
                : "You are not currently hosting any events"
            }
            <h1>Book Club Meetings You Are Attending</h1>
            {myEvents.attending 
                ? myEvents.attending.map(event => 
                <EventDetails event={event} type="attending" setChangeInEvent={setChangeInEvent} setBookForDetails={props.setBookForDetails}  />
                // <Event event={event} type="attending" setEventForDetails={props.setEventForDetails} />
                ) 
                : "You are not currently attending any events"
            }
        </div>
    )
}