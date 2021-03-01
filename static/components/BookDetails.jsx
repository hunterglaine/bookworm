"use strict";

function BookDetails(props) {
    
    let { categoryLabel } = useParams();
    let history = useHistory();
    const { eventId } = useParams();

    const removeBook = (evt) => {
        evt.preventDefault;

        fetch("/api/remove-book-from-category", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({"category": categoryLabel,
                                    "isbn": props.bookForDetails.isbn,
                                    "title": props.bookForDetails.title}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => alert(data["success"]))
        history.push("/user/home")
    } 

    const addEventBook = (evt) => {
        evt.preventDefault;

        fetch("/api/add-book-to-event", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({"event_id": eventId,
                                    "isbn": props.bookForDetails.isbn}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            if ("error" in data) {
                alert(data["error"])
            }
            else {
                alert(data["success"])
                history.push("/user-events")
            } 
        })
        
    } 
    
    return (
        <div className="book-tile">
            <img src={props.bookForDetails.image} alt={props.bookForDetails.title}/>
            <h2>{props.bookForDetails.title}</h2>
            <p>Written By {props.bookForDetails.author.slice(2,-2)}</p>
            <p>Length: {props.bookForDetails.page_length} Pages</p>
            <p>{props.bookForDetails.description}</p>
            {eventId !== "home" ? null :<button onClick={removeBook} >Remove {props.bookForDetails.title} from {categoryLabel} </button>}
            {eventId === "home" || categoryLabel === "event" ? null : <button onClick={addEventBook}>Suggest Book</button>}
        </div>
    )
}