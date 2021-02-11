"use strict";

// import "./secrets.sh";

// Create and dsiplay the navigation bar at the top of the page - logo, search bar, create account button, and log in butto
function TopNavigation() {
    const [books, setBooks] = React.useState({})
    function bookSearch(evt) {
        evt.preventDefault();
        console.log("Clicked")
        const bookQuery = document.getElementById('book-search').value
        console.log(bookQuery)
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookQuery}&maxResults=10&key=${GBOOKS_API_KEY}`)
        .then (response => response.json())
        .then(data => {
            setBooks(data)
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

    return (
        <React.Fragment>
            <img src="/static/img/bookworm_logo.jpg" alt="Bookworm Logo" id="logo"></img>
            <form className="topnav">
                <input  type="text" id="book-search" placeholder="Search for book by title or author"></input>
                <input type="submit" onClick={bookSearch}></input>
            </form>
            <button id="create-account" >Create Account</button>
            <button id="log-in">Log In</button>
        </React.Fragment>
    );
};


// function SearchResults(bookSearchData) {
//     for (book of bookSearchData) {
//         return (
//             <React.Fragment>
//                 {book}
//             </React.Fragment>
//         );
//     };
// };


ReactDOM.render(
    <TopNavigation />, document.querySelector('#root')
);

// ReactDOM.render(
//     <SearchResults />, document.querySelector('#root')
// );