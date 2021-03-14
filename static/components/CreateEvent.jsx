"use strict";

function CreateEvent(props) {

    const[eventCity, setEventCity] = React.useState('');
    const[eventState, setEventState] = React.useState(null);
    const[date, setDate] = React.useState(null);
    const[startTime, setStartTime] = React.useState(null);
    const[endTime, setEndTime] = React.useState(null);

    let history = useHistory();

    const makeNewEvent = (evt) => {
        evt.preventDefault();
        console.log(date, startTime, endTime)

        const eventDetails = {"host_id": props.userLoggedIn.userId,
                                "city": eventCity,
                                "state": eventState,
                                "eventDate": date,
                                "startTime": startTime,
                                "endTime": endTime}

        fetch("/new-event", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(eventDetails),
            headers: {
                    'Content-Type': 'application/json'
                },
        })
        .then (response => response.json())
        .then(data => {
            if ("error" in data) {
                alert(data["error"]);
                history.push("/create-event");
            }
            else {
                alert(data["success"]);
                history.push("/users-events");
            } 
        }
        )}

    return (
        <div>
            <Row className="m-0">
                <Col sm={3}></Col>
                <Col sm={6}>
                    <Card style={{padding: "2rem"}}>
                        <h1 className="on-card">Host a Book Club!</h1>
                        <Form onSubmit={makeNewEvent}>
                            <p>
                                <label htmlFor="event-city">City* </label>
                                <FormControl type="text" name="event-city" placeholder="ex. Remote (if remote)" onChange={(e) => setEventCity(e.target.value)} autoFocus required />
                            </p>
                            <label htmlFor="event-sate">State</label>
                            <FormControl as="select" name="state" placeholder="California" onChange={(e) => setEventState(e.target.value)}>
                                <option value="">Remote</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </FormControl>
            {/* <p>
                <label htmlFor="event-state">State </label>
                <input type="text" name="event-state" placeholder="Leave Blank if Remote" onChange={(e) => setEventState(e.target.value)} />
            </p> */}
                                <p>
                                    <label htmlFor="event-date">What day do you want to host your book club?</label>
                                    <FormControl type="date" name="date" max="2030-12-31" onChange={(date) => setDate(date.target.value)} />
                                </p>
                                <p>
                                    <label htmlFor="event-start-time">When does the meeting start?</label>
                                    <FormControl type="time" name="start-time" onChange={(time) => setStartTime(time.target.value)} />
                                </p>
                                <p>
                                    <label htmlFor="event-end-time">When does the meeting end?</label>
                                    <FormControl type="time" name="end-time" onChange={(time) => setEndTime(time.target.value)} />
                                </p>
                                <p>
                                    <Button className="button" type="submit">Submit</Button>
                                </p>
                        </Form>
                    </Card>
                </Col>
                <Col sm={3}></Col>
            </Row>
        </div>

    )
}
