"use strict";

function UserEvents(props) {

    const [myEvents, setMyEvents] = React.useState({"hosting": {"past": null, "upcoming": null}, 
                                                   "attending": {"past": null, "upcoming": null}})
    const [changeInEvent, setChangeInEvent] = React.useState(null)
    const [whichEvents, setWhichEvents] = React.useState("upcoming");

    let history = useHistory();
 
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
            }
        })
    }, [changeInEvent])
  

    React.useEffect(() => {

        setChangeInEvent(true)
        setChangeInEvent(null)
    }, [whichEvents])

    return (
        <div>
            <Row className="m-0">
            <Col sm={8} >
                <h1>{whichEvents === "upcoming" ? "Book Clubs You're Hosting" : "Book Clubs You Hosted"}</h1>
            </Col>
            <Col sm={2} >
                <Button className="button" onClick={() => history.push("/create-event")}>Host a Book Club</Button>
            </Col>
            <Col sm={2}>
                <ToggleButtonGroup type="radio" name="which-events" value={whichEvents}>
                    <ToggleButton className="toggle-button" value="upcoming" onClick={() => setWhichEvents("upcoming")}>Upcoming</ToggleButton>
                    <ToggleButton className="toggle-button" value="past" onClick={() => setWhichEvents("past")}>Past</ToggleButton>
                </ToggleButtonGroup>
            </Col>
            </Row>
            {myEvents.hosting[whichEvents]
                ? 
                myEvents.hosting[whichEvents].map((event, idx) =>
                <Row key={idx} className="m-0">
                    <Col sm={1}>
                    </Col>
                    <Col sm={10} className="mt-4">
                        <Card className="text-center" border="light">
                            <EventDetails event={event} type="hosting" changeInEvent={changeInEvent} setChangeInEvent={setChangeInEvent} setBookForDetails={props.setBookForDetails} />
                        </Card>
                    </Col>
                </Row>
                ) 
                : <Row className="m-0">
                <Col sm={1}>
                </Col>
                <Col sm={10} className="mt-4">
                    <Card className="text-center" border="light">
                        <h4>{whichEvents === "upcoming" ? "You are not currently hosting any events" : "You have not hosted any events"}</h4>
                    </Card>
                </Col>
            </Row>
            }
            <Row className="m-0">
            <h1>{whichEvents === "upcoming" ? "Book Clubs You're Attending" : "Book Clubs You Attended"}</h1>
            </Row>
            {myEvents.attending[whichEvents]
                ? 
                myEvents.attending[whichEvents].map((event, idx) =>
                <Row key={idx} className="m-0">
                    <Col sm={1}>
                    </Col>
                    <Col sm={10} className="mt-4">
                        <Card className="text-center" border="light">
                            <EventDetails event={event} type="attending" changeInEvent={changeInEvent} setChangeInEvent={setChangeInEvent} setBookForDetails={props.setBookForDetails}  />
                        </Card>
                    </Col>
                </Row>
                ) 
                : <Row className="m-0">
                <Col sm={1}>
                </Col>
                <Col sm={10} className="mt-4">
                    <Card className="text-center" border="light">
                        <h4>{whichEvents === "upcoming" ? "You are not currently attending any events" : "You have not attended any events"}</h4>
                    </Card>
                </Col>
            </Row>
            }
        </div>
    )
}