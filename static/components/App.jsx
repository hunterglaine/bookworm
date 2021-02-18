"use strict";

const Router = ReactRouterDOM.BrowserRouter;
const Link = ReactRouterDOM.Link;
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;
const useHistory = ReactRouterDOM.useHistory;


function App() {

    const [userLoggedIn, setUserLoggedIn] = React.useState(''); // How do I set the initial state if I will be passing in an integer
    const [bookQuery, setBookQuery] = React.useState('');
    console.log(userLoggedIn);

  // if (!userLoggedIn) {
      return (
          <Router>
            <div>
              <nav>
                <div>
                  <img src="./static/img/bookworm_logo2.jpg" alt="Bookworm Logo"/>
                </div>
                <div>
                  <SearchBar bookQuery={bookQuery} setBookQuery={setBookQuery} />
                </div>
                <div>
                  <Link to="/login">Login</Link>
                </div>
                <div>
                  <Link to="/create-account">Create Account</Link>
                </div>
              </nav>
              <Switch>
                <Route path="/login">
                  <LogIn userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
                </Route>
                <Route path="/create-account">
                  <CreateAccount />
                </Route>
                <Route path="/user">
                  <UserPage userLoggedIn={userLoggedIn} />
                </Route>
                <Route path="/book-search">
                  <SearchResults bookQuery={bookQuery} userLoggedIn={userLoggedIn} />
                </Route>
              </Switch>
          </div>
      </Router>
      );
  }

  // else {
  //   return (
  //       <Router>
  //         <div>
  //           <nav>
  //               <ul>
  //                 <li>
  //                   <img src="/static/img/bookworm_logo2.jpg" alt="Bookworm Logo"/>
  //                 </li>
  //                 <li>
  //                   <SearchBar />
  //                 </li>
  //                 <li>
  //                   <Link to="/user-home">Your Books</Link>
  //                 </li>
  //                 <li>
  //                   <Link to="/log-out">LogOut</Link>
  //                 </li>
  //               </ul>
  //             </nav>
  //           <Switch>
  //             <Route path="/user-home">
  //               <UserBookShelves />
  //             </Route>
  //             <Route path="/log-out">
  //               <Logout />
  //             </Route>
  //             <Route path="/">
  //               <Home />
  //             </Route>
  //           </Switch>
  //         </div>
  //       </Router>
  //     );
  //   }
  














// function SearchBar() {
//     const [books, setBooks] = React.useState({})
//     function bookSearch(evt) {
//         evt.preventDefault();
//         console.log("Clicked")
//         const bookQuery = document.getElementById('book-search').value
//         console.log(bookQuery)
//         fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookQuery}&maxResults=10&key=`)
//         .then (response => response.json())
//         .then(data => {
//             setBooks(data.items)
//             console.log(data.items);
    
//                 // console.log(data.items)
//                 // for (const book in data.items) {
//                 //     console.log(data.items[book])};
//                 // for (const book of data.items) {
//                 //     console.log(book.volumeInfo.imageLinks.thumbnail)
//                 // };
//             for (const book of data.items) {
//                 return (
//                         <div className="book-tile">
//                             <img src={book.volumeInfo.imageLinks.thumbnail} />
//                             <h2>{book.volumeInfo.title}</h2>
//                             <h3>{book.volumeInfo.authors}</h3>
//                             <p>{book.volumeInfo.description}</p>
//                         </div>
//                     );
//             } 
//         });
//     };
    
         
//     return (
//         <div>
//             <form className="search-bar">
//                 <input  type="text" id="book-search" placeholder="Search for book by title or author"></input>
//                 <input type="submit" onClick={bookSearch}></input>
//             </form>
//         </div>
//     );
    
// }



// function LogIn() {

//     function LogUserIn(evt) {
//         evt.preventDefault();
//         [form, setForm] = React.useState({})
//         const formData = {"email": document.getElementsByName('email').value,
//                             "password": document.getElementsByName('password').value}

//         console.log(document.getElementsByName('email').value)
//         console.log(document.getElementsByName('password').value)
//         fetch("/api/login", {
//             method: "POST",
//             headers:{
//                 "content_type":"application/json",
//             },
//             body: JSON.stringify(formData),
//         })

//     } 

//     return (
//     <div>
//         <h1>Log In</h1>
//         <form action="/api/login" method="POST">
//             <input type="text" name="email" placeholder="Your Email" />
//             <input type="password" name="password" placeholder="Your Password" />
//             <input type="submit" onSubmit={LogUserIn}/>
//         </form>
//     </div>
//     );

// };




ReactDOM.render(<App />, document.getElementById("root"));