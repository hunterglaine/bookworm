"use strict";

function AllEvents(props) {
    const [allEvents, setAllEvents] = React.useState({})
    const [currentEvent, setCurrentEvent] = React.useState(null)

    const addAttendee = () => {
            
        console.log(currentEvent)
        
        fetch('/api/add-attendee', {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({"event": currentEvent}),
            headers: {
                    'Content-Type': 'application/json'
                },
        })
        .then(response => response.json())
        .then(data => {
            if ("error" in data) {
            alert(data["error"]);
        }
        else {
            console.log(data["success"])
        } 
    })
}

    React.useEffect(() => {
        if (currentEvent) addAttendee();
    }, [currentEvent])

    React.useEffect(() => {
        fetch("/api/all-events")
        .then(response => response.json())
        .then(data => setAllEvents(data))
    }, [])

    return (
        <div>
            <hr/>
            <h1>Book Club Meetings</h1>
            {allEvents.events ? allEvents.events.map(event => 
                    (<div>
                        <h2>{event.id} There is a book club on {event.event_date.slice(0,16)}!</h2>
                        <h3>Location: {event.city} </h3>
                        <h3>Attendees</h3>
                        {event.attending.map(attendee => 
                            (<p value={`${attendee.first_name} ${attendee.last_name}`} >{`${attendee.first_name} ${attendee.last_name}`}</p>))
                        }
                        {props.userLoggedIn.userId 
                        ? <input type="button" value="Attend" id={event.id} onClick={(e) => {setCurrentEvent(e.target.id)}} />
                        : <Link to="/create-account">Create an account or log in to attend an event</Link>}
                        <hr/>
                    </div>)) : ''
                }
        </div>
    )

}
// onClick={addAttendee}