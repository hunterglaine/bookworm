"use strict";

function BookDetails(props) {
    
    let { categoryLabel } = useParams();
    let history = useHistory();

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
        history.push("/user")
    } 
    
    return (
        <div>
            <img src={props.bookForDetails.image} alt={props.bookForDetails.title}/>
            <h2>{props.bookForDetails.title}</h2>
            <p>Written By {props.bookForDetails.author.slice(2,-2)}</p>
            <p>Length: {props.bookForDetails.page_length} Pages</p>
            <p>{props.bookForDetails.description}</p>
            <button onClick={removeBook} >Remove {props.bookForDetails.title} from {categoryLabel} </button>
        </div>
    )
}