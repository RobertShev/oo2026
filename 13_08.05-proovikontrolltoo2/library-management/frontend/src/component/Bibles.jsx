// rfce

import { useEffect, useState } from "react"
import { API_URL } from "../config"

function Bibles() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function fetchBibles() {
            try {
                const data = await fetch(`${API_URL}/api/bibles`);
                const fetchData = await data.json();
                setBooks(fetchData.slice());
            } catch (e) {
                console.error("Unable to fetch", e);
            }
            }
            fetchBibles();
    }, []);

  return (
    <div>
        {books.map(book => 
            <div>
                <div>{book.bible_id}</div>
                <div>{book.language}</div>
                <div>{book.version}</div>
                <br />
            </div>)}
    </div>
  )
}

export default Bibles