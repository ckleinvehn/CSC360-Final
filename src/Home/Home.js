/**
 * Brandon Hernandez
 */

 // React
 import React from "react";

 // Material-UI
import { 
  Button, Box, Card, CardActions, CardContent, CardMedia,
  Chip, Collapse, Grid, IconButton, LinearProgress, Typography
} from '@material-ui/core';
import { Link, ExpandMore } from '@material-ui/icons';

// classNames conditionally 
import clsx from 'clsx';

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

  
  handleOpen = (i) => {
    this.setState({ opened: i });
  }


  handleClose = () => {
    this.setState({ opened: null });
  }


  render() {
    const heading = {
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
      <main onClick={(e) => { console.log(e.target); }}>
        <Typography variant="h3" align="center" style={heading}><b>Most Popular <i>New York Times</i> Articles</b></Typography>
        <Typography variant="h6" align="center" style={subheading}>from the Past 30 Days</Typography>

        {
          this.state.articles == null ?
          <LinearProgress /> :
          <Grid container spacing={5}>
            { 
              this.state.articles.map((article, i) => (
                <Grid item xs key={i}>
                  <NewsCard
                    opened={i === this.state.opened}
                    handleClose={this.handleClose}
                    handleOpen={() => { this.handleOpen(i) }}
                    article={article} />
                </Grid>
                )
              )
            }
          </Grid>
        } 
      </main>
    );
  }
}


function NewsCard(props) {
  const classes = homeStyles();

  const handleExpandClick = () => {
    if (props.opened) props.handleClose();
    else props.handleOpen();
  };

  // what follows is such a hack: wanted the functionality of <Collapse /> but w/o normal flow
  // so we create a box w/ the same width in its place and absolutely position the original
  // and the CSS is basically spaghetti code; it was nice-looking code at some point
  return (
    <>
    {props.opened ? <Box width={300} maxHeight={0} /> : null}
    <Card tabIndex={1} className={clsx(classes.article, {[classes.absoluteFlow]: props.opened}, {[classes.relativeFlow]: !props.opened})} raised>
        <a href={props.article.url} target="_blank" rel="noopener noreferrer">
          <CardMedia
            className={classes.thumbnail}
            image={props.article.thumbnail}
            title={props.article.headline}
            alt={props.article.headline}
          />
        </a>
 
        <CardContent>
              <Typography variant="h5" gutterBottom>{props.article.headline}</Typography>
              <div style={{marginBottom: '3rem'}}>
                <Typography variant="body2">{props.article.snippet}</Typography>
              </div>
        </CardContent>
        
        <div className={clsx({[classes.opened]: props.opened}, {[classes.notOpened]: !props.opened})}>
        <CardActions>
            <Button
              className={clsx(classes.readMore, {[classes.readMoreOpen]: props.opened})}
              startIcon={<Link />}
              variant="outlined"
              href={props.article.url}
              rel="noopener"
              target="_blank"
              size="small">Read More
            </Button>
            <IconButton
              className={clsx(classes.expand, {
              [classes.expandOpen]: props.opened})}
              onClick={handleExpandClick}
              aria-expanded={props.opened}
              aria-label="show more"
            >
              <ExpandMore />
            </IconButton>
        </CardActions>
        </div>

        <Collapse in={props.opened} timeout={0} unmountOnExit>
          <CardContent>
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
        </Collapse>
    </Card>
    </>
  );
}
