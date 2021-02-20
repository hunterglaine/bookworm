"use strict";

function BookTile(props) {
    const { book } = props;
    console.log(book.volumeInfo.title);
    console.log(props.userCategories);

    const addNewSelect = () => {
        // console.log("Okay, so it registers a change.... ")
        const newCategory = document.getElementById("new-category");
        console.log(document.forms[1])
        console.log(document.forms[1].chooseCategory)
        if (document.forms[1].chooseCategory.options[document.forms[1].chooseCategory.selectedIndex].value === "add-new") {
            newCategory.style.visibility = "visible"
        }
        else {
            newCategory.style.visibility = "hidden";
        }
    }

    function addToCategory(evt) {
        evt.preventDefault();
        const category = document.getElementById("category-add").value
        console.log(category)
        let categoryDetails = {"label": category,
                                "book": book}

        if (category === "add-new") {
            const newCategory = document.getElementById("new-category").value
            console.log(newCategory)
            categoryDetails = {"label": newCategory,
                                    "book": book}
            console.log(categoryDetails)
            fetch("/api/add-category", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(categoryDetails),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then (response => response.json())
            .then(data => console.log(data))
        }
        
        fetch("/api/add-book-to-category", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(categoryDetails),
                headers: {
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                // mode: "cors"
            })
            .then (response => response.json())
            .then(data => console.log(data))
        }

 
    if (props.userLoggedIn) {
        return (
            <div className="book-tile">
                <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "/static/img/no_book_cover.png"} alt="Book Cover" />
                <h2>{book.volumeInfo.title}</h2>
                {/* <h3>{book.volumeInfo.authors}</h3> */}
                {book.volumeInfo.authors ? book.volumeInfo.authors.map(author => 
                            (<div><h3>{author}</h3></div>)) : ''
                        }
                <p>{book.volumeInfo.description}</p>
                
                <form id="add-to-category" onSubmit={addToCategory} >
                    <label htmlFor="category-add">
                        Add to your bookshelf
                    </label>
                    <select id="category-add" name="chooseCategory" onChange={addNewSelect} >
                        <option disabled selected value> -- Select a Category -- </option>
                        {props.userCategories.map(category => 
                            (<option value={category.label}>{category.label} </option>))
                        }
                        <option value="add-new">Add New Category</option>
                    </select>
                    <input type="text" id="new-category" style={{visibility: "hidden"}} />
                    <input type="submit" />
                </form>
                <hr/>
                </div>
                )}
                
    else {
        return (
        <div className="book-tile">
        <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "/static/img/no_book_cover.png"} alt="Book Cover" />
        <h2>{book.volumeInfo.title}</h2>
        {book.volumeInfo.authors ? book.volumeInfo.authors.map(author => 
            (<div>
                <h3>{author}</h3>
            </div>)) : ''
        }
        <p>{book.volumeInfo.description}</p>
        <Link to="/create-account">Create an account to add a book to your shelf!</Link>
        <hr/>
        </div>
        )
        }
}
        

 