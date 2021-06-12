import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { Article } from "./components/Article";
import { ARTICLES_LINK } from "./config";
import { generateArticleId, recalculateArticleSize } from "./utils";

function App() {
  const [store, setStore] = useState({
    articles: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setStore((store) => ({ ...store, loading: true }));

        const response = await fetch(ARTICLES_LINK);
        const [articles] = await response.json();

        if (articles) {
          setStore((store) => ({
            ...store,
            articles: articles.map(generateArticleId),
            loading: false,
          }));
        }
      } catch (e) {
        console.error(e.message);
        setStore((store) => ({ ...store, loading: false, error: e.message }));
      }
    };

    fetchArticles().catch(() => null);
  }, []);

  const deleteArticle = (id) => {
    setStore((initialStore) => {
      const filteredArticles = initialStore.articles.map((row) => ({
        ...row,
        columns: row.columns.filter((article) => article.id !== id),
      }));

      return { ...initialStore, articles: filteredArticles };
    });
  };

  const changeArticle = (changedArticle) => {
    setStore((initialStore) => {
      const filteredArticles = initialStore.articles.map((row) => ({
        ...row,
        columns: row.columns.map((article) =>
          article.id === changedArticle.id ? changedArticle : article
        ),
      }));

      return { ...initialStore, articles: filteredArticles };
    });
  };

  return (
    <>
      <Container fluid="lg">
        {store.loading ? (
          <h1>Loading</h1>
        ) : store.error ? (
          <h1>Error: {store.error}</h1>
        ) : (
          store.articles?.map(recalculateArticleSize).map((columns, idx) => (
            <Row key={idx}>
              {columns?.map((article) => (
                <Col key={article.id} sm={12} md={article.width}>
                  <Article
                    article={article}
                    changeArticle={changeArticle}
                    deleteArticle={deleteArticle}
                  />
                </Col>
              ))}
            </Row>
          ))
        )}
      </Container>
    </>
  );
}

export default App;
