"use strict";

function AllEvents(props) {
    const [allEvents, setAllEvents] = React.useState({})

    const addAttendee = (evt) => {
        evt.preventDefault();

        // const event = {"event": ""}
        
        // fetch('/api/add-attendee', {
        //     method: "POST",
        //     credentials: "include",
        //     body: JSON.stringify(),
        //     headers: {
        //             'Content-Type': 'application/json'
        //         },
        // })
    }

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
                    (<div id={event.id}>
                        <h2>There is a book club on {event.event_date}!</h2>
                        <h3>Location: {event.city} </h3>
                        <h3>Attendees</h3>
                        {event.attending.map(attendee => 
                            (<p value={`${attendee.first_name} ${attendee.first_name}`} >{`${attendee.first_name} ${attendee.first_name}`}</p>))
                        }
                        {props.userLoggedIn.userId ? <input type="button" value="Attend" onClick={addAttendee} /> : <Link to="/create-account">Create and account or log in to attend an event</Link>}
                    </div>)) : ''
                }
        </div>
    )
}