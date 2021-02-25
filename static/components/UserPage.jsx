"use strict";

function UserPage(props) {

    const userBookshelf = []
    
    React.useEffect(() =>  {
        fetch("/api/user-data")
        .then (response => response.json())
        .then ((result) => Object.entries(result))
        .then((data) => props.setBookshelfCategories(data))
    }, [])

    for (const category of props.bookshelfCategories) {
        userBookshelf.push(<CategoryContainer 
                            label={category[0]} 
                            books={category[1]} 
                            setBookForDetails={props.setBookForDetails} />)
    }
    return (
        <div>
            <h1>
                {props.userLoggedIn["userFirstName"]}'s Bookshelf
            </h1>
            
            <div>{userBookshelf}</div>
        </div>

        // Get a list of the user's categories
        // Ideally want a side bar with a list of all of the user's categories
    );
}