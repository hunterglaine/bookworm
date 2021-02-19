"use strict";

function BookTile(props) {
    const { book } = props;
    console.log(book.volumeInfo.title);
    console.log(props.userCategories);

    

    // let authors_str = "";
    // for (const [index, author] of book.authors.entries()) {
    //     if (index < (book.authors.length() - 1)) {
    //         authors_str += author, ",";
    //     }
    //     else {
    //         authors_str += author;
    //     }
    // };
    // const items = []
    // for (const [index, value] of props.userCategories.entries()) {
    //     items.push(<option key={index}>{value}</option>)
    //   }
    // const items = []
    // for (const [index, value] of props.userCategories.entries()) {
    //     items.push(<option key={index}>{value}</option>)
    //   }
    // console.log(userLoggedIn["userId"])
    if (props.userLoggedIn["userId"]) {
        return (
            <div className="book-tile">
                <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "/static/img/blank_book_cover.jpg"} alt="Book Cover" />
                <h2>{book.volumeInfo.title}</h2>
                <h3>{book.volumeInfo.authors}</h3>
                <p>{book.volumeInfo.description}</p>
                
                <form id="add-to-category">
                    <label htmlFor="category-add">
                        Add to your bookshelf
                    </label>
                    <select id="category-add" name="category">
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
        

 