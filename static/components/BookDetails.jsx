"use strict";

function BookDetails(props) {
    
    let { categoryLabel } = useParams();
    let history = useHistory();
    const { eventId } = useParams();

    React.useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const removeBook = (evt) => {
        evt.preventDefault();

        fetch("/categories", {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({"category": categoryLabel,
                                    "isbn": props.bookForDetails.isbn,
                                    "title": props.bookForDetails.title}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        // .then(data => alert(data["success"]))
        history.push("/user/home/browsing")
    } 

    const addEventBook = (evt) => {
        evt.preventDefault();

        fetch("/add-book-to-event", {
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
                history.push("/users-events")
            } 
        })
        
    } 
    
    return (
        <Row className="m-0">
            <Col sm={1}></Col>
            <Col sm={10} className="mt-4">
            <Card className="card-color" border="light" style={{padding: "2rem"}}>
            <div className="wrapper">
                <img className="book-tile"src={props.bookForDetails.image} alt={props.bookForDetails.title}/>
                <h2>{props.bookForDetails.title}</h2>
                <h4>Written By {props.bookForDetails.author}</h4>
                <h5>Length: {props.bookForDetails.page_length} Pages</h5>
                {eventId !== "home" ? null :<Button className="button" onClick={removeBook} >Remove {props.bookForDetails.title} from {categoryLabel}</Button>}
                {eventId === "home" || categoryLabel === "event" ? null : <Button className="button" onClick={addEventBook}>Suggest Book</Button>}
                <br/>
                <p>{props.bookForDetails.description}</p>
                {/* {eventId !== "home" ? null :<Button className="button" onClick={removeBook} >Remove {props.bookForDetails.title} from {categoryLabel}</Button>}
                {eventId === "home" || categoryLabel === "event" ? null : <Button className="button" onClick={addEventBook}>Suggest Book</Button>} */}
            </div>
            </Card>
            </Col>
            <Col sm={1}></Col>
        </Row>
    )
}