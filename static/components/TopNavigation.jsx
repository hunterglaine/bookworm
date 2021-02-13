"use strict";

// import "./secrets.sh";

// Create and dsiplay the navigation bar at the top of the page - logo, search bar, create account button, and log in butto
function TopNavigation() {

    return (
        <React.Fragment>
            <img src="/static/img/bookworm_logo.jpg" alt="Bookworm Logo" id="logo"></img>
            <SearchBar />
            <button id="create-account" >Create Account</button>
            <button id="log-in">Log In</button>
        </React.Fragment>
    );
};


// function SearchResults(bookSearchData) {
//     for (book of bookSearchData) {
//         return (
//             <React.Fragment>
//                 {book}
//             </React.Fragment>
//         );
//     };
// };


ReactDOM.render(
    <TopNavigation />, document.querySelector('#root')
);

// ReactDOM.render(
//     <SearchResults />, document.querySelector('#root')
// );