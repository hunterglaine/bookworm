"use strict";

function UserPage(props) {
    return (
        <h1>
            {props.userLoggedIn["userFirstName"]}'s Bookshelf
        </h1>

        // Display each of the user's categories, with the books in each one
        // Get a list of the user's categories
        // Ideally want a side bar with a list of all of the user's categories
    );
}