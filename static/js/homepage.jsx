"use strict";

// Create and dsiplay the navigation bar at the top of the page - logo, search bar, create account button, and log in butto
function TopNavigation() {
    function bookSearch(evt) {
        evt.preventDefault();
        console.log("Clicked")
        const bookQuery = document.getElementById('book-search').value

        fetch(`https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=10&key=`)
        .then (response => response.json())
        .then(data => cosole.log(data))
        // {
            
        //     const bookSearchData = [
        //         {

        //         },
        //     ]};
    };
    // React.useEffect(() => {
    //     document.addEventListener('click', (evt) => {
    //         // const bookQuery = document.getElementById('book-search').value.split().join("+")

    //         fetch(`https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=10&key=`)
    //         .then (response => response.json())
    //         .then(data => console.log(data))
    
    //     });
    // }, []);
    
    
    return (
        <React.Fragment>
            <img src="/static/img/bookworm_logo.jpg" alt="Bookworm Logo" id="logo"></img>
            <form id="book-search">
                <input  type="text" placeholder="Search for book by title or author"></input>
                <input type="submit" onClick={bookSearch}></input>
            </form>
            <button id="create-account" >Create Account</button>
            <button id="log-in">Log In</button>
        </React.Fragment>
    );
}



ReactDOM.render(
    <TopNavigation />, document.querySelector('#root')
);