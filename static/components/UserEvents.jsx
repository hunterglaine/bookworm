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
                console.log("It's doing this...")
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
                {/* <Col sm={2}></Col> */}
            <Col sm={8} >
                <h1>{whichEvents === "upcoming" ? "Book Clubs You're Hosting" : "Book Clubs You Hosted"}</h1>
            </Col>
            <Col sm={2} >
                <Button className="button" onClick={() => history.push("/create-event")}>Host a Book Club</Button>
            </Col>
            <Col sm={2}>
                {whichEvents === "upcoming" ? <Button className="button" onClick={() => setWhichEvents("past")}>Past Events</Button> : <Button className="button" onClick={() => setWhichEvents("upcoming")}>Upcoming Events</Button>}
            </Col>
            </Row>
            // {/* {myEvents.hosting  */}
            {myEvents.hosting[whichEvents]
                ? 
                // {/* myEvents.hosting.map(event =>  */}
                myEvents.hosting[whichEvents].map(event =>
                <Row className="m-0">
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
            {/* {myEvents.attending  */}
            {myEvents.attending[whichEvents]
                ? 
                myEvents.attending[whichEvents].map(event =>
                // myEvents.attending.map(event => 
                <Row className="m-0">
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