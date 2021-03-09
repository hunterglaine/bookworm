"use strict";

function UserPage(props) {

    const { eventId } = useParams();
    const { type } = useParams();
    const userBookshelf = []
    let history = useHistory();
    
    React.useEffect(() =>  {
        fetch("/user-data", {
            method: "GET"
        })
        .then (response => response.json())
        .then ((result) => Object.entries(result))
        .then((data) => props.setBookshelfCategories(data))
    }, [props.newLabel])


    // const updateAccountForm = () => {
    //     history.push("/update-account-info")
    // }


    for (const category of props.bookshelfCategories) {
        userBookshelf.push(<CategoryContainer 
                            label={category[0]} 
                            books={category[1]} 
                            setBookForDetails={props.setBookForDetails}
                            setNewLabel={props.setNewLabel}
                            eventId={eventId}
                            type={type} />)
    }
    return (
        <div>
            <h1 className="bookshelf-title">
                {props.userLoggedIn["userFirstName"]}'s Bookshelf
            </h1>
            <Button className="button" onClick={() => history.push("/update-account-info")} >Update My Account Info</Button>
            <Container>{userBookshelf}</Container>
        </div>

        // Get a list of the user's categories
        // Ideally want a side bar with a list of all of the user's categories
    );
}