//** Frank Lenoci */

export default async function TopSectionFetch() {
  return fetch(
    `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.REACT_APP_NYT_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      var articles = [];

      data.results.forEach((article) => {
        if (article.section === "world" && article.subsection === "") {
        } else if (article.section === "world" && article.subsection !== "") {
          articles.push({
            section: article.subsection,
          });
        } else {
          articles.push({
            section: article.section,
          });
        }
      });
      return articles;
    });
}
