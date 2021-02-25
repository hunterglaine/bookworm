"use strict";

const Router = ReactRouterDOM.BrowserRouter;
const Link = ReactRouterDOM.Link;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;
const useHistory = ReactRouterDOM.useHistory;
const useParams = ReactRouterDOM.useParams;


function App() {

    const [userLoggedIn, setUserLoggedIn] = React.useState({userId: null, userFirstName: null});

    const [bookQuery, setBookQuery] = React.useState(null);
    const [userCategories, setUserCategories] = React.useState();
    const [bookshelfCategories, setBookshelfCategories] = React.useState([]);
    const [bookForDetails, setBookForDetails] = React.useState({});

    React.useEffect(() => {
      if (localStorage.getItem("userId") !== "null") {
        setUserLoggedIn({userId: localStorage.getItem("userId"), userFirstName: localStorage.getItem("userFirstName")})
    }
    }, [])

      return (
          <Router>
            <div>
              <nav>
                <div>
                  <img id="logo" src="/static/img/bookworm_logo2.png" alt="Bookworm Logo"/>
                </div>
                <div>
                  <SearchBar 
                    bookQuery={bookQuery} 
                    setBookQuery={setBookQuery} 
                    userCategories={userCategories} 
                    setUserCategories={setUserCategories} 
                    />
                </div>
                <div>
                  <Link to="/all-events">
                    All Bookworm Events
                  </Link>
                </div>
                <div>
                  <Link to={userLoggedIn.userId ? "/logout" : "/login"}>
                    {userLoggedIn.userId ? "Log Out" : "Log In"}
                  </Link>
                </div>
                <div>
                  <Link to={userLoggedIn.userId ? "/user-events" : null }>
                    {userLoggedIn.userId ? "My Events" : null }
                  </Link>
                </div>
                <div>
                  <Link to={userLoggedIn.userId ? "/user" : "/create-account"}>
                    {userLoggedIn.userId ? "My Bookshelf" : "Create Account"}
                  </Link>
                </div>
              </nav>
              <Switch>
                <Route path="/login">
                  <LogIn userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
                </Route>
                <Route path="/login">
                  <LogIn userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
                </Route>
                <Route path="/logout">
                  <LogOut userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
                </Route>
                <Route path="/create-account">
                  <CreateAccount />
                </Route>
                <Route path="/user">
                  <UserPage 
                    userLoggedIn={userLoggedIn}
                    userCategories={userCategories}
                    setBookshelfCategories={setBookshelfCategories}
                    bookshelfCategories={bookshelfCategories}
                    setBookForDetails={setBookForDetails}
                   />
                </Route>
                <Route path="/book-search">
                  <SearchResults 
                    bookQuery={bookQuery} 
                    userLoggedIn={userLoggedIn} 
                    userCategories={userCategories}
                    setUserCategories={setUserCategories} />
                </Route>
                <Route path="/book-details/:categoryLabel" >
                  <BookDetails bookForDetails={bookForDetails} />
                </Route>
                <Route path="/create-event" >
                  <CreateEvent userLoggedIn={userLoggedIn} />
                </Route>
                <Route path="/user-events" >
                  <UserEvents userLoggedIn={userLoggedIn} />
                </Route>
                <Route path="/all-events" >
                  <AllEvents userLoggedIn={userLoggedIn} />
                </Route>
              </Switch>
          </div>
      </Router>
      );
  }


ReactDOM.render(<App />, document.getElementById("root"));