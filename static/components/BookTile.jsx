"use strict";

function BookTile(props) {
    const { book } = props;
    console.log(book.volumeInfo.imageLinks)

    // let authors_str = "";
    // for (const [index, author] of book.authors.entries()) {
    //     if (index < (book.authors.length() - 1)) {
    //         authors_str += author, ",";
    //     }
    //     else {
    //         authors_str += author;
    //     }
    // };

    return (
        <div className="book-tile">
            {/* <img src={ book.volumeInfo.imageLinks.thumbnail } alt="Book Cover" /> */}
            <h2>{book.volumeInfo.title}</h2>
            <h3>{book.volumeInfo.authors}</h3>
            <p>{book.volumeInfo.description}</p>
            {/* {% if session.get("user") %}
                <form id="add-to-category">
                    <label for="category-add">
                        Add to your bookshelf
                    </label>
                    <select id="category-add" name="category" placeholder="Add book to your shelf">
                        <option value="" disabled selected>Select a category</option>
                        {% for category in categories %}
                            <option value="{category.label}">{category.label}</option>
                        {% endfor%}
                        <option value="add-new">Add New Category</option>
                    </select>
                    <input type="hidden" id="new-category"/>
                    <input type="submit" />
                </form>
            {% else %}
                    <form action="/">
                        <button>Create an account to add this book to your shelf!</button>
                    </form>
            {% endif %} */}
    
            {/* <input id="category-add">Add Book to Your Shelf?</button> */}
        </div>
    // {% endfor %} 
    )
}
