"use strict";

function UserEvents(props) {

    const [myEvents, setMyEvents] = React.useState({})
    const [changeInEvent, setChangeInEvent] = React.useState(null)
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

    return (
        <div>
            <Row className="m-0">
                <Col sm={2}></Col>
            <Col sm={8} >
                <h1>Book Clubs You're Hosting</h1>
            </Col>
            <Col sm={2} >
                <Button className="button" onClick={() => history.push("/create-event")}>Host a Book Club</Button>
            </Col>
            </Row>
            {myEvents.hosting 
                ? 
                myEvents.hosting.map(event => 
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
                        <h4>You are not currently hosting any events</h4>
                    </Card>
                </Col>
            </Row>
            }
            <Row className="m-0">
            <h1>Book Clubs You're Attending</h1>
            </Row>
            {myEvents.attending 
                ? myEvents.attending.map(event => 
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
                        <h4>You are not currently attending any events</h4>
                    </Card>
                </Col>
            </Row>
            }
        </div>
    )
}