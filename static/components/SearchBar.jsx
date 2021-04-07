"use strict";

function SearchBar(props) {
    
    let history = useHistory();

    function bookSearch(evt) {
        evt.preventDefault();
        const urlQuery = document.getElementById("book-search").value
        props.setBookQuery(document.getElementById("book-search").value)

        fetch("/categories")
        .then (response => response.json())
        // .then(result => {console.log(result["categories"]); return result;})
        .then((data) => {
            props.setUserCategories(data["categories"])
            // localStorage.setItem("categories", data["categories"]) // here
        })
        .catch(console.error)

         history.push("/book-search")
        // history.push(`/book-search/${querystring.stringify({bookQuery:urlQuery})}`)
        history.push(`/book-search/${urlQuery}`)
        document.getElementById("search-bar").reset();
    }
    
    return (
            <Form inline="true" id="search-bar" onSubmit={bookSearch} className="p-2"> {/* className="mr-auto"  */}
                <FormControl type="text" id="book-search" placeholder="Search by title or author" style={{ display: "inline-block", width: "auto", lineHeight: "2"}}/>
                <Button className="button-search" type="submit" variant="outline-primary">Search</Button>
            </Form>
    );
    
}


