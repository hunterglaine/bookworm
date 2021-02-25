"use strict";

function UserEvents(props) {

    const [myEvents, setMyEvents] = React.useState({})

    React.useEffect(() =>  {
        fetch("/api/user-events")
        .then (response => response.json())
        // .then ((result) => Object.entries(result))
        .then((data) => setMyEvents(data))
        //     return data})
        // .then((data) => props.setBookshelfCategories(data))
        // // .then((data) => console.log("LOOK HERE", data))
    }, [])
    console.log(myEvents)
    return (
        <div>
            <Link to="/create-event">
                Create a New Book Club Event
            </Link>
            <h1>Book Club Meetings You Are Hosting</h1>
            {myEvents.hosting ? myEvents.hosting.map(event => 
                    (<div>
                        <h2>On {event.event_date}, you are hosting a book club!</h2>
                        <h3>Location: {event.city} </h3>
                        <button>Allow book suggestions</button>
                    </div>)) : ''
                }
            <h1>Book Club Meetings You Are Attending</h1>
            {myEvents.attending ? myEvents.attending.map(event => 
                    (<div>
                        <h2>On {event.event_date}, you are attending a book club!</h2>
                        <h3>Location: {event.city} </h3>
                    </div>)) : ''
                }
        </div>
    )
}