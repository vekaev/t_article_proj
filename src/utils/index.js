export const recalculateArticleSize = ({ columns: articles }) => {
  let totalArticlesLength = articles.reduce(
    (acc, article) => acc + article.width,
    0
  );

  if (totalArticlesLength !== 12) {
    const averageArticlesLength = 12 / articles.length;

    return articles.map((article) => ({
      ...article,
      width: averageArticlesLength,
    }));
  }

  return articles;
};

export const generateArticleId = (row) => ({
  ...row,
  columns: row.columns.map((article) => ({ ...article, id: generateUUID() })),
});

export const calculateImgSize = (articleWidth) => {
  if (window.innerWidth <= 768) articleWidth = 12;

  const width = (window.innerWidth / 12) * articleWidth;
  const height = width / (16 / 9);

  return `&height=${height}&width=${width}`;
};

export const createImageLink = (article) =>
  article.imageUrl + calculateImgSize(article.width);

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
