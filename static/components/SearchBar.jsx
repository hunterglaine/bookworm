"use strict";

function SearchBar(props) {
    
    let history = useHistory();

    function bookSearch(evt) {
        evt.preventDefault();
        props.setBookQuery(document.getElementById("book-search").value)
        console.log("Clicked")

        fetch("/api/categories")
        .then (response => response.json())
        // .then((result) => {console.log(result.categories); return result})
        .then((data) => props.setUserCategories(data["categories"]))
            // console.log(`This is the data from request ${data.categories[0].id}`)})
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


