"use strict";

function AllEvents(props) {
    const [allEvents, setAllEvents] = React.useState({})
    const [currentEvent, setCurrentEvent] = React.useState(null)
    let history = useHistory();

    const addAttendee = () => {
            
        console.log(currentEvent)
        
        fetch('/attendee', {
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
            history.push("/users-events")
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
            <Row className="m-0">
                <h1>Upcoming Book Club Meetings</h1>
            </Row>
            {allEvents.upcoming ? allEvents.upcoming.map((event, idx) => 
                    (<Row key={idx} className="m-0">
                    <Col sm={3}>
                    </Col>
                    <Col sm={6} className="mt-4">
                        <Card className="text-center" border="light">
                        <div className="card-color">
                        <h4 style={{padding: "1rem"}}>There is a book club on {event.event_date.slice(0,16)}!</h4>
                        <p><strong>Location:</strong> {event.city} </p>
                        <p><strong>Hosted By:</strong> {event.host.first_name} {event.host.last_name}</p>
                        <p><strong>Attendees</strong></p>
                        {event.attending.map((attendee, idx) => 
                            (<p key={idx} value={`${attendee.first_name} ${attendee.last_name}`} >{`${attendee.first_name} ${attendee.last_name}`}</p>))
                        }
                        {props.userLoggedIn.userId 
                        ? 
                        <Button className="button" value="Attend" id={event.id} onClick={(e) => {setCurrentEvent(e.target.id)}}>Attend</Button>
                        : <Link className="button" to="/create-account">Create an account or log in to attend</Link>}
                        </div>
                        </Card>
                    </Col>
                    <Col sm={3}>
                    </Col>
                </Row>)) : ''
                }
        </div>
    )

}