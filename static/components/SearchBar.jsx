"use strict";

function SearchBar(props) {
    
    let history = useHistory();

    function bookSearch(evt) {
        evt.preventDefault();

        console.log("Clicked")
        // console.log(document.getElementById('book-search').value)
        // props.setBookQuery(document.getElementById('book-search').value)
        console.log(props.bookQuery)
        // ^ this is not working; also need to find a way to pass bookQuery to SearchResults component
        history.push("/book-search")
        
    }
    return (
            <form className="search-bar" onSubmit={bookSearch}>
                <input  type="text" id="book-search" placeholder="Search for book by title or author" onChange={(e) => props.setBookQuery(e.target.value)}></input>
                <input type="submit" ></input>
            </form>
    );
    
}


