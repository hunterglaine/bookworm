"use strict;"

function App() {
    return (
        <div>
            <TopNavigation />
            <LogIn />
        </div>
    
    )
}


function TopNavigation() {

    return (
        <div>
            <img src="/static/img/bookworm_logo.jpg" alt="Bookworm Logo" id="logo"></img>
            <SearchBar />
            <button id="create-account" >Create Account</button>
            <button id="log-in">Log In</button>
        </div>
    );
};


function SearchBar() {
    const [books, setBooks] = React.useState({})
    function bookSearch(evt) {
        evt.preventDefault();
        console.log("Clicked")
        const bookQuery = document.getElementById('book-search').value
        console.log(bookQuery)
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookQuery}&maxResults=10&key=AIzaSyBS_YYhCbJligxutBTEK81nX5Fx7BARcZc`)
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
    
         
    return (
        <div>
            <form className="search-bar">
                <input  type="text" id="book-search" placeholder="Search for book by title or author"></input>
                <input type="submit" onClick={bookSearch}></input>
            </form>
        </div>
    );
    
}



function LogIn() {

    return (
    <div>
        <h1>Log In</h1>
        <form action="/login" method="POST">
            <input type="text" name="email" placeholder="Your Email" />
            <input type="password" name="password" placeholder="Your Password" />
            <input type="submit" />
        </form>
    </div>
    );

};

