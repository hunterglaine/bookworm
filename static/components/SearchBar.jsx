"use strict";

function SearchBar(props) {
    
    let history = useHistory();
    console.log("This is before the fetch that reassigns",props.userCategories)

    function bookSearch(evt) {
        evt.preventDefault();
        props.setBookQuery(document.getElementById("book-search").value)
        console.log("Clicked")

        fetch("/api/categories")
        .then (response => response.json())
        .then(result => {console.log(result["categories"]); return result;})
        .then((data) => props.setUserCategories(data["categories"]))
        .catch(console.error)

        history.push("/book-search")
        
    }
    
    return (
            <form className="search-bar" onSubmit={bookSearch}>
                <input  type="text" id="book-search" placeholder="Search for book by title or author" ></input>
                {/* onChange={(e) => props.setBookQuery(e.target.value)} */}
                <input type="submit" ></input>
            </form>
    );
    
}


