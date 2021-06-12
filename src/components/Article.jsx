import { memo, useEffect, useState } from "react";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { createImageLink } from "../utils";

export const Article = memo(({ article, deleteArticle, changeArticle }) => {
  const [inDelete, setInDelete] = useState({ timer: 0, status: false });

  const handleDelete = () => {
    setInDelete({
      timer: setTimeout(() => {
        deleteArticle(article.id);
      }, 5000),
      status: true,
    });
  };

  const cancelDelete = () => {
    clearTimeout(inDelete.timer);
    setInDelete({ status: false, timer: 0 });
  };

  return (
    <Card className={`mt-4 mb-4 ${inDelete.status && "hide-animation"}`}>
      <a href={article.url}>
        <Card.Img
          src={createImageLink(article)}
          variant="top"
          className="img-responsive"
        />
      </a>
      <Card.Body>
        <Title
          title={article.title}
          url={article.url}
          changeArticle={(title) => changeArticle({ ...article, title })}
        />
        <Button onClick={handleDelete}>Delete</Button>
      </Card.Body>
      {inDelete.status && (
        <div className="pre-delete">
          <Button onClick={cancelDelete}>Revert</Button>
        </div>
      )}
    </Card>
  );
});

const Title = ({ title: initialTitle, url, changeArticle }) => {
  const [title, setTitle] = useState(initialTitle);
  const [inChange, setInChange] = useState(false);

  return (
    <>
      {inChange ? (
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => changeArticle(title)}
          />
        </InputGroup>
      ) : (
        <a href={url}>
          <Card.Title>{title}</Card.Title>
        </a>
      )}
      <Button
        variant="outline"
        onClick={() => setInChange((initial) => !initial)}
      >
        Change
      </Button>
    </>
  );
};
