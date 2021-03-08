"use strict";

function CategoryContainer(props) {
    
    // const [newLabel, setNewLabel] = React.useState(null)
    const labelChange = React.useRef("");
    const booksInCategory = []
    let history = useHistory();
    console.log("This is new label",props. newLabel)
    console.log("THIS is label up top", props.label)

    const showForm = (arg) => (evt) => {
        evt.preventDefault();

        if(arg === 1) {
                document.getElementById(`change-label-${props.label}`).style.visibility="visible";
            }
        else if (arg === 0) {
             document.getElementById(`change-label-${props.label}`).style.visibility="hidden";
             document.getElementById(`change-label-${props.label}`).reset();
        }
    }

    const updateCategory = (evt) => {
        evt.preventDefault();
        console.log("This is the labelChange.curretn useRef:", labelChange.current)
            fetch("/update-category", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({"old_label": props.label,
                                        "new_label": labelChange.current}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                alert(data["success"])
                props.setNewLabel(data.label)
                document.getElementById(`change-label-${props.label}`).style.visibility="hidden";
                document.getElementById(`change-label-${props.label}`).reset();
        })
    }


    for (const book of props.books) {
        booksInCategory.push(<Book key={book.isbn} 
                                    book={book} 
                                    setBookForDetails={props.setBookForDetails} 
                                    categoryLabel={props.label} 
                                    eventId={props.eventId}
                                    type={props.type} />)
    }
    
    return ( 
        <div>
        <h1>{props.label}</h1>
        <form id={`change-label-${props.label}`} onSubmit={updateCategory} style={{visibility: "hidden"}} >
            <input type="text" placeholder={props.label} onChange={(e) => labelChange.current = (e.target.value)}  />
            <input type="button" value="Nevermind" onClick={showForm(0)} />
            <input type="submit" />
        </form>
        <button onClick={showForm(1)}>Change Category Name</button>
        {/* <div className="scroll-shelf" >{booksInCategory}</div> */}
        <div>{booksInCategory}</div>
        <img src="/static/img/single-shelf.PNG" alt=""/>
        </div>
    )
}