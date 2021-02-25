"use strict";

function BookTile(props) {
    const { book } = props;
    const [categoryName, setCategoryName] = React.useState(props.userLoggedIn.userId ? props.userCategories[0].label : '');

    const addNewSelect = () => {
        
        for (let i = 1; i < 11; i += 1) {
            
            let newCategory = document.forms[i].newCategory;

            if (document.forms[i].chooseCategory.options[document.forms[i].chooseCategory.selectedIndex].value === "add-new") {
                newCategory.style.visibility = "visible"
            }
            else {
                newCategory.style.visibility = "hidden";
            }
    }}

    function addToCategory(evt) {
        evt.preventDefault();

        console.log(categoryName)
        let categoryDetails = {"label": categoryName,
                                "book": book}

        fetch("/api/add-book-to-category", {
                method: "POST",
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
                }
            })
        document.getElementById("add-to-category").reset();
        setCategoryName(props.userCategories[0].label)

        for (let i = 1; i < 11; i += 1) {
            document.forms[i].newCategory.style.visibility = "hidden";
        }
    }

 
    if (props.userLoggedIn.userId) {
        return (
            <div className="book-tile">
                <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "/static/img/no_book_cover.png"} alt="Book Cover" />
                <h2>{book.volumeInfo.title}</h2>
                {book.volumeInfo.authors ? book.volumeInfo.authors.map(author => 
                            (<div><h3>{author}</h3></div>)) : ''
                        }
                <p>{book.volumeInfo.description}</p>
                
                <form id="add-to-category" onSubmit={addToCategory} >
                    <label htmlFor="category-add">
                        Add to your bookshelf
                    </label>
                    <select id="category-add" name="chooseCategory" onChange={(e) => {
                        setCategoryName(e.target.value);
                        addNewSelect();}} >
                        {props.userCategories.map(category => 
                            (<option value={category.label} >{category.label} </option>))
                        }
                        <option value="add-new">Add New Category</option>
                    </select>
                    <input type="text" name="newCategory" id="new-category" style={{visibility: "hidden"}} onChange={(e) => setCategoryName(e.target.value)} />
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
        

 