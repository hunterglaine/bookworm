"use strict";

function SearchResults(props) {

    // const { urlQuery } = useParams();
    const content = []
    const [books, setBooks] = React.useState([]);
    let bookKey = ''

    React.useEffect(() =>  {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${props.bookQuery}&maxResults=10`)
        .then (response => response.json())
        .then (result => setBooks(result.items))
        }, [props.bookQuery])    

        // if (books.length === 0) return <div>Loading...</div>
        
        let i = 0
        for (const book of books) {
            
            bookKey = book.id
            // Sometimes the id is the same for two books being returned by Google Books.... 

            content.push(<BookTile key={i} book={book} userLoggedIn={props.userLoggedIn} userCategories={props.userCategories} />);
            i += 1 
        }
        
        return <Container>{content ? content : "Nothing found!"}</Container>

}