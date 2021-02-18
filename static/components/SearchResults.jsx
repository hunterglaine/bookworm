"use strict";

function SearchResults(props) {

    const content = []
    const [books, setBooks] = React.useState([]);
    let bookKey = ''
    
    React.useEffect(() =>  {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${props.bookQuery}&maxResults=10&key=`)
        .then (response => response.json())
        .then((data) => setBooks(data.items));
        }, [])    
        console.log(books);

        if (books.length === 0) return <div>Loading...</div>
        

        for (const book of books) {
            // console.log(book.volumeInfo.industryIdentifiers[0])
            if (book.volumeInfo.industryIdentifiers[0].type === "ISBN_13") {
                bookKey = book.volumeInfo.industryIdentifiers[0].identifier
            }
            else {
                bookKey = book.volumeInfo.industryIdentifiers[1].identifier
                // book.volumeInfo.industryIdentifiers.type.ISBN_13.identifier
            }
            content.push(<BookTile key={bookKey} book={book}/>);
        }

        return <div>{content}</div>

}