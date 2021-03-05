"use strict";

// import "./secrets.sh";

// Create and dsiplay the navigation bar at the top of the page - logo, search bar, create account button, and log in butto
function TopNavigation(props) {

    return (
        // <div>
        //     <img src="/static/img/bookworm_logo.jpg" alt="Bookworm Logo" id="logo"></img>
        //     <SearchBar />
        //     <button id="create-account" >Create Account</button>
        //     <button id="log-in">Log In</button>
        // </div>
        <nav>
            <ul>
                <li>
                    <img id="logo" src="/static/img/bookworm_logo2.png" alt="Bookworm Logo"/>
                </li>
                <li>
                  <SearchBar 
                    bookQuery={props.bookQuery} 
                    setBookQuery={props.setBookQuery} 
                    userCategories={props.userCategories} 
                    setUserCategories={props.setUserCategories} 
                    />
                </li>
                <li>
                  <Link className="link-button" to="/all-events">
                    All Bookworm Events
                  </Link>
                </li>
                <li>
                  <Link className="link-button" to={props.userLoggedIn.userId ? "/logout" : "/login"}>
                    {props.userLoggedIn.userId ? "Log Out" : "Log In"}
                  </Link>
                </li>
                <li>
                  <Link className="link-button" to={props.userLoggedIn.userId ? "/user-events" : null }>
                    {props.userLoggedIn.userId ? "My Events" : null }
                  </Link>
                </li>
                <li>
                  <Link className="link-button" to={props.userLoggedIn.userId ? "/user/home/browsing" : "/create-account"}>
                    {props.userLoggedIn.userId ? "My Bookshelf" : "Create Account"}
                  </Link>
                </li>
            </ul>
        </nav>
    );
};

