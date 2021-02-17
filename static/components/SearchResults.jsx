"use strict";

function SearchResults(props) {

    const content = []
    const [books, setBooks] = React.useState([]);
    
    React.useEffect(() =>  {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${props.bookQuery}&maxResults=10&key=`)
        .then (response => response.json())
        .then((data) => setBooks(data.items));
        }, [])    
        console.log(books);

        if (books.length === 0) return <div>Loading...</div>
        
        for (const book of books) {
            content.push(<Book key={books.volumeInfo.industryIdentifiers.type.ISNB_13.identifier} book={book}/>);
        }

        return <div>{content}</div>

}