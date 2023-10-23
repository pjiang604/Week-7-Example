import "./styles.css";
import { useEffect, useRef, useState } from "react";
import Article from "./components/Article";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false); //will constain state of data fetching. if data isn't ready, then loading will be true and once data is ready then loading will be false

  const inputRef = useRef();

  useEffect(() => {
    const source_url = `https://hn.algolia.com/api/v1/search?query=${query}`;

    async function getArticles() {
      const resp = await fetch(source_url);
      const data = await resp.json();
      setArticles(data.hits);
      setLoading(false);
    }

    setLoading(true);
    setTimeout(() => {
      console.log(loading);
      getArticles();
      console.log(loading);
    }, 2000); //setting a delay of 2seconds
  }, [query]); //second argument. for time being, it's empty. if no second argument provided, then it means that function/code inside useEffect will be running every time component is rendered

  function handleSearch() {
    setQuery(inputRef.current.value); //whatever is in search variable is what will be assigned to query
  }

  return (
    <div className="App">
      <h3>HN Search Engine</h3>
      <input
        ref={inputRef} //now you have direct access to DOM element which you won't normally have access to
        type="text"
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
      {loading === true ? (
        <div>Loading...</div>
      ) : (
        articles.map(function (article) {
          return (
            <div>
              <Article key={article.id} article={article} />
            </div>
          );
        })
      )}
    </div>
  );
}
