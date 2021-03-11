"use strict";

function SearchBar(props) {
    
    let history = useHistory();

    function bookSearch(evt) {
        evt.preventDefault();
        // const urlQuery = document.getElementById("book-search").value
        props.setBookQuery(document.getElementById("book-search").value)

        fetch("/categories")
        .then (response => response.json())
        .then(result => {console.log(result["categories"]); return result;})
        .then((data) => props.setUserCategories(data["categories"]))
        .catch(console.error)

         history.push("/book-search")
        // history.push(`/book-search/${urlQuery}`)
        document.getElementById("search-bar").reset();
    }
    
    return (
            <Form id="search-bar" onSubmit={bookSearch} className="mr-auto" inline>
                <FormControl type="text" id="book-search" placeholder="Search for book by title or author" />
                <Button className="button-search" type="submit" variant="outline-dark">Search</Button>
            </Form>
    );
    
}


