"use strict";

function SearchBar() {
    const [books, setBooks] = React.useState({})
    function bookSearch(evt) {
        evt.preventDefault();
        console.log("Clicked")
        const bookQuery = document.getElementById('book-search').value
        console.log(bookQuery)
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookQuery}&maxResults=10&key=`)
        .then (response => response.json())
        .then(data => {
            setBooks(data.items)
            console.log(data);
    
                // console.log(data.items)
                // for (const book in data.items) {
                //     console.log(data.items[book])};
                // for (const book of data.items) {
                //     console.log(book.volumeInfo.imageLinks.thumbnail)
                // };
            for (const book of data.items) {
                return (
                    <div>
                        <div className="book-tile">
                            <img src={book.volumeInfo.imageLinks.thumbnail} />
                            <h2>{book.volumeInfo.title}</h2>
                            <h3>{book.volumeInfo.authors}</h3>
                            <p>{book.volumeInfo.description}</p>
                        </div>
                    </div>
                    );
            } 
        });
    };
    if (data.items.length > 0) {
        for (const book of data.items) {
            return (
                <div>
                    <div className="book-tile">
                        <img src={book.volumeInfo.imageLinks.thumbnail} />
                        <h2>{book.volumeInfo.title}</h2>
                        <h3>{book.volumeInfo.authors}</h3>
                        <p>{book.volumeInfo.description}</p>
                    </div>
                </div>
                );
        } 

        )
    }
    return (
        <div>
            <form className="search-bar">
                <input  type="text" id="book-search" placeholder="Search for book by title or author"></input>
                <input type="submit" onClick={bookSearch}></input>
            </form>
        </div>
    );
    
}

