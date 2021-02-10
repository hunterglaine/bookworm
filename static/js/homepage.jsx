"use strict";

// Create and dsiplay the navigation bar at the top of the page - logo, search bar, create account button, and log in butto
function TopNavigation() {
    return (
        <React.Fragment>
            <img src="/static/img/bookworm_logo.jpg" alt="Bookworm Logo" id="logo"></img>
            <form for="book-search" class ="topnav" id="book-search">
                <input  type="text" placeholder="Search for book by title or author"></input>
                <input type="submit"></input>
            </form>
            <button class ="topnav" id="create-account">Create Account</button>
            <button class ="topnav" id="log-in">Log In</button>
        </React.Fragment>
    );
}



ReactDOM.render(
    <TopNavigation />, document.querySelector('#root')
);