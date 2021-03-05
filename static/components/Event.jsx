"use strict";

function Event(props) {
    const { event } = props
    let history = useHistory();

    const goToEventDetails = (type) => (evt) => {
        evt.preventDefault();
        props.setEventForDetails(event)
        history.push(`/event-details/${event.id}/${type}`)
    }

    return (
        (<div>
            <h2>On {event.event_date.slice(0,16)}, you are {props.type === "hosting" ? "hosting" : "attending"} a book club!</h2>
            {props.type === "hosting" ? null : <h3>Hosted by: {event.host}</h3>}
            <h3>Time: {event.start_time} to {event.end_time}</h3>
            <h3>Location: {event.city}</h3>
            {props.type === "hosting" ? <button onClick={goToEventDetails("hosting")}>Click Here For More Info</button> : <button onClick={goToEventDetails("attending")}>Click Here For More Info</button>}
        </div>)
    )
}