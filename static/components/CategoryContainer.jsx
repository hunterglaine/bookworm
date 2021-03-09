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
        console.log("This is the labelChange.current useRef:", labelChange.current)
            // fetch("/update-category", {
            fetch("/categories", {
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

    const deleteCategory = (evt) => {
        evt.preventDefault();
        fetch("/categories", {
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify({"label": props.label}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            alert(data["success"]);
            props.setNewLabel(data.label);
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
        <Container>
        <Row>
            <Col><h3>{props.label}</h3></Col>
            <Col>
            <Form id={`change-label-${props.label}`} onSubmit={updateCategory} style={{visibility: "hidden"}} inline >
                <FormControl type="text" placeholder={props.label} onChange={(e) => labelChange.current = (e.target.value)}  />
                <Button className="button" type="button" onClick={showForm(0)}>Nevermind</Button>
                <Button className="button" type="submit" >Submit</Button>
            </Form>
            </Col>
        </Row>
        <Row>
            <Col sm={3}>
            <Button className="button" onClick={showForm(1)}>Change Category Name</Button>
            </Col>
            <Col sm={3}>
            <Button className="button" onClick={deleteCategory}>Delete Category</Button>
            </Col>
        </Row>
        {/* <div className="scroll-shelf" >{booksInCategory}</div> */}
        <div className="scrolling-wrapper-flexbox">{booksInCategory}</div>
        <Row><img src="/static/img/single-shelf.PNG" alt=""/></Row>
        </Container>
    )
}