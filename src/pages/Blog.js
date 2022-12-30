import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Article from "../components/Article";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  const getData = () => {
    axios
      .get("http://localhost:3004/articles")
      .then((res) => setBlogData(res.data));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (content.length < 140) {
      setError(true);
    } else {
      axios
        .post("http://localhost:3004/articles", {
          author,
          content,
          date: Date.now(),
        })
        .then(
          () => {
            setError(false);
            setAuthor("");
            setContent("");
            getData();
          },
          () => {
            setError(true);
          }
        );
    }
  };

  return (
    <div className="blog-container">
      <ul>
        {blogData
          .sort((a, b) => b.date - a.date)
          .map((article) => (
            <Article key={article.id} article={article} />
          ))}
      </ul>
      <div className="commentary">
        <h1>Blog</h1>

        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Nom"
            onChange={(e) => setAuthor(e.target.value)}
            value={author} //Permet de vider le formulaire, on ne pas utiliser value si il n'y a pas de onChange, defaultValue pour valeur de base en React
          />
          <textarea
            style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
            placeholder="Message"
            onChange={(e) => setContent(e.target.value)}
            value={content} //Permet de vider le formulaire
          ></textarea>
          {error && <p>Veuillez écrire un minimum de 140 caractères</p>}
          <input type="submit" value="Envoyer" />
        </form>
      </div>
    </div>
  );
};

export default Blog;
