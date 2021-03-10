"use strict";

const Router = ReactRouterDOM.BrowserRouter;
const Link = ReactRouterDOM.Link;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;
const useHistory = ReactRouterDOM.useHistory;
const useParams = ReactRouterDOM.useParams;

const Navbar = ReactBootstrap.Navbar;
const Nav = ReactBootstrap.Nav;
const Form = ReactBootstrap.Form;
const FormControl = ReactBootstrap.FormControl;
const Button = ReactBootstrap.Button;
const Carousel = ReactBootstrap.Carousel;
const Container = ReactBootstrap.Container;
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const Card = ReactBootstrap.Card;



function App() {

    const [userLoggedIn, setUserLoggedIn] = React.useState({userId: null, userFirstName: null});

    const [bookQuery, setBookQuery] = React.useState(null);
    const [userCategories, setUserCategories] = React.useState();
    const [bookshelfCategories, setBookshelfCategories] = React.useState([]);
    const [bookForDetails, setBookForDetails] = React.useState({});
    const [eventForDetails, setEventForDetails] = React.useState({});
    const [newLabel, setNewLabel] = React.useState(null)
  

    React.useEffect(() => {
      if (localStorage.getItem("userId") !== "null") {
        setUserLoggedIn({userId: localStorage.getItem("userId"), userFirstName: localStorage.getItem("userFirstName")})
    }
    }, [])

      return (
          <Router>
            <div>
              <TopNavigation
                bookQuery={bookQuery} 
                setBookQuery={setBookQuery} 
                userCategories={userCategories} 
                setUserCategories={setUserCategories}
                userLoggedIn={userLoggedIn} />
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
                <Route exact path="/user/:eventId/:type">
                  <UserPage 
                    userLoggedIn={userLoggedIn}
                    userCategories={userCategories}
                    setBookshelfCategories={setBookshelfCategories}
                    bookshelfCategories={bookshelfCategories}
                    setBookForDetails={setBookForDetails}
                    newLabel={newLabel}
                    setNewLabel={setNewLabel}
                   />
                </Route>
                <Route exact path="/update-account-info">
                  <UpdateAccount 
                    userLoggedIn={userLoggedIn}
                   />
                </Route>
                <Route path="/book-search">
                  <SearchResults 
                    bookQuery={bookQuery} 
                    userLoggedIn={userLoggedIn} 
                    userCategories={userCategories}
                    setUserCategories={setUserCategories} />
                </Route>
                <Route exact path="/book-details/:categoryLabel/:eventId" >
                  <BookDetails bookForDetails={bookForDetails} />
                </Route>
                <Route path="/create-event" >
                  <CreateEvent userLoggedIn={userLoggedIn} />
                </Route>
                <Route path="/users-events" >
                  <UserEvents userLoggedIn={userLoggedIn}
                              setBookForDetails={setBookForDetails}
                              setEventForDetails={setEventForDetails} />
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