"use strict";

function AllEvents(props) {
    const [allEvents, setAllEvents] = React.useState({})
    const [currentEvent, setCurrentEvent] = React.useState(null)
    let history = useHistory();

    const addAttendee = () => {
            
        console.log(currentEvent)
        
        fetch('/add-attendee', {
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
            alert(data["success"])
            history.push("/user-events")
        } 
    })
}

    React.useEffect(() => {
        if (currentEvent) addAttendee();
    }, [currentEvent])

    React.useEffect(() => {
        fetch("/events")
        .then(response => response.json())
        .then(data => setAllEvents(data))
    }, [])

    return (
        <div>
            <hr/>
            <h1>Book Club Meetings</h1>
            {allEvents.events ? allEvents.events.map(event => 
                    (<div>
                        <h4>There is a book club on {event.event_date.slice(0,16)}!</h4>
                        <p><strong>Location:</strong> {event.city} </p>
                        <p><strong>Hosted By:</strong> {event.host.first_name} {event.host.last_name}</p>
                        <p><strong>Attendees</strong></p>
                        {event.attending.map(attendee => 
                            (<p value={`${attendee.first_name} ${attendee.last_name}`} >{`${attendee.first_name} ${attendee.last_name}`}</p>))
                        }
                        {props.userLoggedIn.userId 
                        ? <Button className="button" value="Attend" id={event.id} onClick={(e) => {setCurrentEvent(e.target.id)}}>Attend</Button>
                        : <Link to="/create-account">Create an account or log in to attend an event</Link>}
                        <hr/>
                    </div>)) : ''
                }
        </div>
    )

}