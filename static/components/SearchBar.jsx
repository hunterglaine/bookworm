"use strict";

function SearchBar(props) {
    

    function bookSearch(evt) {
        evt.preventDefault();

        console.log("Clicked")
        console.log(document.getElementById('book-search').value)
        props.setBookQuery(document.getElementById('book-search').value)
        // ^ this is not working; also need to find a way to pass bookQuery to SearchResults component
        
    }
    return (
            <form className="search-bar">
                <input  type="text" id="book-search" placeholder="Search for book by title or author"></input>
                <input type="submit" onClick={bookSearch}></input>
            </form>
    );
    
}


