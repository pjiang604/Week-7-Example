import { useEffect, useState } from "react";

export default function Article({ article }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const author_url = `https://hn.algolia.com/api/v1/users/${article.author}`;
    async function getAuthor() {
      const resp = await fetch(author_url);
      const data = await resp.json();
      setAuthor(data);
    }
    getAuthor();
  }, []);

  return (
    <div className="article">
      <p>
        <a href={article.url}>{article.title}</a>
      </p>
      <div className="tags">
        {article._tags.map((tag) => (
          <span>{tag}</span>
        ))}
      </div>
      {author && (
        <p className="author-details">
          <span className="author">By {author.username}</span>:
          <span>{author.about}</span>
        </p>
      )}
    </div>
  );
}
