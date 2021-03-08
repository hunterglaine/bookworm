"use strict";

function SearchBar(props) {
    
    let history = useHistory();

    function bookSearch(evt) {
        evt.preventDefault();
        props.setBookQuery(document.getElementById("book-search").value)

        fetch("/categories")
        .then (response => response.json())
        .then(result => {console.log(result["categories"]); return result;})
        .then((data) => props.setUserCategories(data["categories"]))
        .catch(console.error)

        history.push("/book-search")
        document.getElementById("search-bar").reset();
    }
    
    return (
            // <form id="search-bar" onSubmit={bookSearch}>
            <Form id="search-bar" onSubmit={bookSearch} inline>
                <FormControl type="text" id="book-search" placeholder="Search for book by title or author" className="ml-sm-2" />
                {/* <input  type="text" id="book-search" placeholder="Search for book by title or author" ></input> */}
                <Button type="submit" variant="outline-dark">Search</Button>
                {/* <input type="submit" ></input> */}
            </Form>
            // </form>
    );
    
}


