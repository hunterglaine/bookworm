"use strict";

function BookTile(props) {
    const { book } = props;
    console.log(book.volumeInfo.title);
    console.log(props.userCategories);

    const addToCategory = (evt) => {
        evt.preventDefault();
        const category = document.getElementById("category-add").value
        console.log(category)
        const categoryDetails = {"label": category,
                                "book": book}

        if (category === "add-new") {
            console.log(category)
        }
        else {
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
    }

    

    // let authors_str = "";
    // for (const [index, author] of book.authors.entries()) {
    //     if (index < (book.authors.length() - 1)) {
    //         authors_str += author, ",";
    //     }
    //     else {
    //         authors_str += author;
    //     }
    // };
 
    if (props.userLoggedIn["userId"]) {
        return (
            <div className="book-tile">
                <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "/static/img/blank_book_cover.jpg"} alt="Book Cover" />
                <h2>{book.volumeInfo.title}</h2>
                <h3>{book.volumeInfo.authors}</h3>
                {/* {book.volumeInfo.authors.map(author => 
                            (<div><h3>{author}</h3></div>))
                        } */}
                <p>{book.volumeInfo.description}</p>
                
                <form id="add-to-category" onSubmit={addToCategory}>
                    <label htmlFor="category-add">
                        Add to your bookshelf
                    </label>
                    <select id="category-add" name="category" >
                        {props.userCategories.map(category => 
                            (<option value={category.label}>{category.label} </option>))
                        }
                        <option value="add-new" defaultValue>Add New Category</option>
                    </select>
                    <input type="hidden" id="new-category"/>
                    <input type="submit" />
                </form>
                <hr/>
                </div>
                )}
                
    else {
        return (
        <div className="book-tile">
        <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ""} alt="Book Cover" />
        <h2>{book.volumeInfo.title}</h2>
        <h3>{book.volumeInfo.authors}</h3>
        <p>{book.volumeInfo.description}</p>
        <Link to="/create-account">Create an account to add a book to your shelf!</Link>
        <hr/>
        </div>
        )
        }
}
        
            
// let authors_str = "";
    // for (const [index, author] of book.authors.entries()) {
    //     if (index < (book.authors.length() - 1)) {
    //         authors_str += author, ",";
    //     }
    //     else {
    //         authors_str += author;
    //     }
    // // };
        

 