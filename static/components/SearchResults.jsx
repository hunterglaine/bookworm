"use strict";

function SearchResults(props) {

    const content = []
    const [books, setBooks] = React.useState([]);
    let bookKey = ''
    
    // const searchGoogle = (query)
    React.useEffect(() =>  {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${props.bookQuery}&maxResults=10&key=`)
        .then (response => response.json())
        .then((data) => setBooks(data.items));
        }, [props.bookQuery])    

       

        if (books.length === 0) return <div>Loading...</div>
        
    
        for (const book of books) {
            // console.log(book.volumeInfo.industryIdentifiers[0])
            if (book.volumeInfo.industryIdentifiers) {
                if (book.volumeInfo.industryIdentifiers[0].type === "ISBN_13") {
                    bookKey = book.volumeInfo.industryIdentifiers[0].identifier
                }
                else {
                    bookKey = book.volumeInfo.industryIdentifiers[1].identifier
                    // NEED TO FIX THIS! IF NO INDUSTRY INDETIFIERS, GET AN ERROR
                } 
                content.push(<BookTile key={bookKey} book={book} userLoggedIn={props.userLoggedIn} userCategories={props.userCategories} />);
            }
            else {
                content.push(<BookTile book={book} userLoggedIn={props.userLoggedIn} userCategories={props.userCategories} />);
            } }
        
        return <div>{content ? content : "Nothing found!"}</div>

}