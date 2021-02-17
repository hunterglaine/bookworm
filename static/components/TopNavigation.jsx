"use strict";

// import "./secrets.sh";

// Create and dsiplay the navigation bar at the top of the page - logo, search bar, create account button, and log in butto
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

