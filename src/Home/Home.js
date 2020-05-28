/**
 * Brandon Hernandez
 */

 // React
 import React from "react";

 // Material-UI
import { 
  Button, Box, Card, CardActions, CardContent, CardMedia,
  Chip, Grid, LinearProgress, Typography
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

// Ours
import homeStyles from "./HomeStyles";
import homeFetch from "./HomeFetch";


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: null };
  }

  componentDidMount() {
    homeFetch()
      .then(articles => {
        this.setState({ articles: articles });
      })
  } 

  render() {
    const heading = {
      marginTop: "2rem",
      textTransform: "lowercase",
      fontVariant: "small-caps",
      fontFamily: "Roboto, sans-serif",
    }

    const subheading = {
      marginTop: ".75rem",
      marginBottom: "2rem",
      textTransform: "uppercase",
      fontVariant: "small-caps",
      fontFamily: "Roboto, sans-serif",
    }

    return (
      <main style={{padding: "0 4rem"}}>
        <Typography variant="h3" align="center" style={heading}><b>Most Popular <i>New York Times</i> Articles</b></Typography>
        <Typography variant="h6" align="center" style={subheading}>from the Past 30 Days</Typography>

        {
          this.state.articles == null ?
          <LinearProgress /> :
          <Grid container spacing={5}>
            { this.state.articles.map((article, i) => <Grid item xs key={i}><NewsCard article={article} /></Grid>) }
          </Grid>
        }
      </main>
    );
  }
}


function NewsCard(props) {
  const classes = homeStyles();

  return (
    <Card className={classes.article} raised>

        <CardMedia
          className={classes.thumbnail}
          image={props.article.thumbnail}
          title={props.article.headline}
          alt={props.article.headline}
        />

        <CardContent>
            <Typography variant="h5" gutterBottom>{props.article.headline}</Typography>
            <Typography variant="body2" gutterBottom>{props.article.snippet}</Typography>

            {
              ['descriptions', 'organizations', 'people', 'geography'].map((tags, i) => 
                props.article[tags].length > 0 ?
                <Box key={i} className={classes.tags}>
                  <Typography variant="h6">{tags}</Typography>
                  { props.article[tags].map((tag, j) => <Chip label={tag[0]} title={tag[1] || ''} key={j} className={classes.tag} />) }
                </Box>
                : null
              )
            }

        </CardContent>

        <CardActions style={{ paddingBottom: 24 }}>
            <Button
              className={classes.readMore}
              startIcon={<LinkIcon />}
              variant="outlined"
              href={props.article.url}
              rel="noopener"
              target="_blank"
              size="small">Read More</Button>
        </CardActions>

    </Card>
  );
}
