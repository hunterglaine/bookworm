"use strict";

function CategoryContainer(props) {
    
    const [newLabel, setNewLabel] = React.useState(null)
    const booksInCategory = []
    let history = useHistory();

    const showForm = (arg) => (evt) => {
        evt.preventDefault();

         if(arg === 1) {
                document.getElementById(`change-label-${props.label}`).style.visibility="visible";
            }
        else if (arg === 0) {
             document.getElementById(`change-label-${props.label}`).style.visibility="hidden";
        }
    }

    const updateCategory = (evt) => {
        evt.preventDefault();

        fetch("/api/update-category", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({"old_label": props.label,
                                    "new_label": newLabel}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            setNewLabel(null)
            alert(data["success"])
        })
    }

    for (const book of props.books) {
        booksInCategory.push(<Book key={book.isbn} book={book} setBookForDetails={props.setBookForDetails} categoryLabel={props.label} />)
    }
    
    return ( 
        <div>
        <h1>{props.label}</h1>
        <form id={`change-label-${props.label}`} onSubmit={updateCategory} style={{visibility: "hidden"}} >
            <input type="text" placeholder={props.label} onChange={(e) => setNewLabel(e.target.value)}  />
            <input type="button" value="Nevermind" onClick={showForm(0)} />
            <input type="submit" />
        </form>
        <button onClick={showForm(1)}>Change Category Name</button>
        <div>{booksInCategory}</div>
        </div>
    )
}