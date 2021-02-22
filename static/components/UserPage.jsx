"use strict";

function UserPage(props) {
    
    fetch("/api/user-data")
    .then (response => response.json())
    .then (result => console.log(result))

    return (
        <h1>
            {props.userLoggedIn["userFirstName"]}'s Bookshelf
            {/* {localStorage.getItem("userFirstName")}'s Bookshelf */}
        </h1>

        // Display each of the user's categories, with the books in each one
        // Get a list of the user's categories
        // Ideally want a side bar with a list of all of the user's categories
    );
}