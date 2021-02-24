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

        fetch("/api/new-event", {
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
                history.push("/user");
            } 
        }
        )}

    return (
        <div>
        <h1>Make a New Book Club Meeting!</h1>
        <form onSubmit={makeNewEvent}>
            <p>
                <label htmlFor="event-city">City* </label>
                <input type="text" name="event-city" placeholder="ex. Remote (if remote)" onChange={(e) => setEventCity(e.target.value)} autoFocus required />
            </p>
            <p>
                <label htmlFor="event-state">State </label>
                <input type="text" name="event-state" placeholder="Leave Blank if Remote" onChange={(e) => setEventState(e.target.value)} />
            </p>
            <p>
                <label htmlFor="event-date">What day do you want to host your book club?</label>
                <input type="date" name="date" max="2030-12-31" onChange={(date) => setDate(date.target.value)} />
            </p>
            <p>
                <label htmlFor="event-start-time">When does the meeting start?</label>
                <input type="time" name="start-time" onChange={(time) => setStartTime(time.target.value)} />
            </p>
            <p>
                <label htmlFor="event-end-time">When does the meeting end?</label>
                <input type="time" name="end-time" onChange={(time) => setEndTime(time.target.value)} />
            </p>
            <p>
                <input type="submit" value="Submit" />
            </p>
        </form>
        </div>

    )
}
