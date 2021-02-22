"use strict";

function BookTile(props) {
    const { book } = props;
    console.log(book.volumeInfo.title);
    console.log(props.userCategories);
    const [addCategory, setAddCategory] = React.useState('');
    const [categoryName, setCategoryName] = React.useState('');
    console.log(categoryName);

    const addNewSelect = () => {
        
        for (let i = 1; i < 11; i += 1) {
            // console.log(`This is document.forms[${i}]`, document.forms[i])
            // console.log(`This is document.forms[${i}].chooseCategory.options`, document.forms[i].chooseCategory.options)
            // console.log(`This is document.forms[${i}].chooseCategory.options + all the selectedIndex stuff`,document.forms[i].chooseCategory.options[document.forms[i].chooseCategory.selectedIndex])
            // console.log(`This is the full thing`,document.forms[i].chooseCategory.options[document.forms[i].chooseCategory.selectedIndex].value)
            let newCategory = document.forms[i].newCategory;
            console.log(newCategory)
            if (document.forms[i].chooseCategory.options[document.forms[i].chooseCategory.selectedIndex].value === "add-new") {
                newCategory.style.visibility = "visible"
                // setAddCategory("add-new")
            }
            else {
                newCategory.style.visibility = "hidden";
            }
    }}

    function addToCategory(evt) {
        evt.preventDefault();
        // const category = document.getElementById("category-add").value
        console.log(categoryName)
        let categoryDetails = {"label": categoryName,
                                "book": book}

        // if (addCategory === "add-new") {
        //     // const newCategory = document.getElementById("new-category").value
        //     // console.log(categoryName)
        //     // categoryDetails = {"label": categoryName,
        //     //                     "book": book}
        //     console.log(categoryDetails)
        //     fetch("/api/add-category", {
        //         method: "POST",
        //         credentials: "include",
        //         body: JSON.stringify(categoryDetails),
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //     })
        //     .then (response => response.json())
        //     .then(data => {
        //         if ("error" in data) {
        //             alert(data["error"]);
        //         }
        //         else {
        //             alert(data["success"]); 
        //         }
        //     })
        //     .then(fetch("/api/add-book-to-category", {
        //         method: "POST",
        //         credentials: "include",
        //         body: JSON.stringify(categoryDetails),
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //     })
        //     .then (response => response.json())
        //     .then(data => alert(data["success"]))
        // )
        // }
        //  else {
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
        for (let i = 1; i < 11; i += 1) {
            document.forms[i].newCategory.style.visibility = "hidden";
        }
    }

 
    if (props.userLoggedIn) {
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
                        setAddCategory(e.target.value);
                        setCategoryName(e.target.value);
                        addNewSelect();}} >
                        <option disabled selected value> -- Select a Category -- </option>
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
        

 