"use strict";

function BookTile(props) {
    const { book } = props;
    let history = useHistory();
    const [categoryName, setCategoryName] = React.useState(props.userLoggedIn.userId ? props.userCategories[0].label : "");

    const addNewSelect = () => {
        
        for (let i = 1; i < 21; i += 1) {
            let newCategory = document.forms[i].newCategory;
            let chooseCategory = document.forms[i].chooseCategory;

            if (chooseCategory.options[chooseCategory.selectedIndex].value === "add-new") {    
                newCategory.style.visibility = "visible"
            }
            else {
                newCategory.style.visibility = "hidden";
            }
        }
    }

    function addToCategory(evt) {
        evt.preventDefault();

        let categoryDetails = {"label": categoryName,
                                "book": book}

        fetch("/categories", {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify(categoryDetails),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then (response => response.json())
            .then(data => {
                if ("error" in data) {
                    alert(data["error"]);
                }
                else {
                    alert(data["success"]);
                    history.push("/user/home/browsing")
                }
            })
        document.getElementById("add-to-category").reset();
        setCategoryName(props.userCategories[0].label) // here
        // setCategoryName(localStorage.getItem("categories")[0].label)

        for (let i = 1; i < 11; i += 1) {
            document.forms[i].newCategory.style.visibility = "hidden";
            
        }
    }

 
    return (
        <Row>
            <Col sm={1}></Col>
            <Col sm={10} className="mt-4">
                <Card className="text-center" border="light" style={{padding: "2rem"}}>
                    <div className="wrapper">
                        <img className="book-tile" src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "/static/img/no_book_cover.png"} alt="Book Cover" />
                    
                        <h3>{book.volumeInfo.title}</h3>
                    
                        {book.volumeInfo.authors ? book.volumeInfo.authors.map((author, idx) => 
                            (<div key={idx}>
                                <h4>{author}</h4>
                            </div>)) : ''
                        }
                        <p>{book.volumeInfo.description}</p>
                    </div>
                    {props.userLoggedIn.userId 
                    ?
                    <Form inline id="add-to-category" onSubmit={addToCategory} >
                        <Row className="mt-3" >
                            <Col sm={2}>
                                <h5>
                                    Add to a Shelf
                                </h5>
                            </Col>
                            <Col sm={4}>
                                <FormControl as="select" id="category-add" name="chooseCategory" onChange={(e) => {
                                    setCategoryName(e.target.value);
                                    addNewSelect();}} >
                                    {props.userCategories.map((category, idx) => 
                                        (<option key={idx} value={category.label} >{category.label} </option>))
                                    }
                                    <option value="add-new">Add New Category</option>
                                </FormControl>
                            </Col>
                            <Col sm={4}>
                                <FormControl type="text" name="newCategory" id="new-category" style={{visibility: "hidden"}} onChange={(e) => setCategoryName(e.target.value)} />
                            </Col>
                            <Col sm={2}>
                                <Button className="button-bare" type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                    :
                    <Link className="button" to="/create-account">Create an account to add a book to your shelf!</Link>
                }
                </Card>
            </Col>
            <Col sm={1}></Col>
        </Row>
    )
}