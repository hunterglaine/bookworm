"use strict";

function UserPage(props) {

    const userBookshelf = []
    
    React.useEffect(() =>  {
        fetch("/api/user-data")
        .then (response => response.json())
        .then ((result) => Object.entries(result))
        .then((data) => props.setUserCategories(data))
        .then((data) => console.log("LOOK HERE", data))
    }, [])
    console.log("These are userCategories on the UserPage", props.userCategories)
    for (const category of props.userCategories) {
        userBookshelf.push(<CategoryContainer 
                            title={category[0]} 
                            books={category[1]} 
                            setBookForDetails={props.setBookForDetails} />)
    }
    return (
        <div>
            <h1>
                {props.userLoggedIn["userFirstName"]}'s Bookshelf
                {/* {localStorage.getItem("userFirstName")}'s Bookshelf */}
            </h1>
            <div>{userBookshelf}</div>
        </div>

        // Display each of the user's categories, with the books in each one
        // Get a list of the user's categories
        // Ideally want a side bar with a list of all of the user's categories
    );
}