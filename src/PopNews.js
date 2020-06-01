import PopNewsStyles from "./PopNewsStyles"
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import RequestPopNews from "./RequestPopNews"
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import LinkIcon from '@material-ui/icons/Link';
import LinearProgress from '@material-ui/core/LinearProgress';
import NYTLogo from './images/nyt-logo.jpg';
import React from "react";
import Typography from "@material-ui/core/Typography";

/*
Brandon Hernandez
*/

function NewsRow(props){
  const classes = PopNewsStyles();
  const rows = props.cards.map((card, i) =>
    <GridListTile key={i} cols={1}>
      {card}
    </GridListTile>
  );

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3}>
        {rows}
      </GridList>
    </div>
  );
}


function NewsCard(props){
  const classes = PopNewsStyles();
  // console.dir(props.article);
  // Needs rework in PopNewsStyles --paddingTop: '56.25%'-- not working properly

  // if thumbnail is NYTlogo set class to default else set to thumbnail
  const imgClass = (props.article.thumbnail === NYTLogo) ? classes.defaultThumb : classes.thumbnail;

  return (
    <Card className={classes.popCard} raised>
        <CardMedia
          component="img"
          className={imgClass}
          image={props.article.thumbnail}
          title={props.article.headline.substring(0,15) + "..."}
          alt="NYT Thumbnail"
        />
        <CardActionArea>
            <CardContent>
                <Typography variant="h5">
                    {props.article.headline}
                </Typography>
                <Typography gutterBottom variant="body2">
                    {props.article.snippet}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button className={classes.customBttn} startIcon={<LinkIcon />}
            variant="outlined"
            href={props.article.url}
            rel="noopener"
            target="_blank"
            size="small">Read More</Button>
        </CardActions>
    </Card>
  );
}

export default class PopNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popNewsCards: null
    }
  }

  componentDidMount () {
    RequestPopNews()
      .then(nytJSON => {
        console.dir(nytJSON.results);
        return nytJSON.results;
      })
      .then(topArticles => {
        var articles = [];
        var cards = [];

        topArticles.map( article => {
          //console.log(article.media);

          /*
            for thumbnail:
            if media in response is not empty then set the given url
            else assign imported defualt NYTLogo
          */
            articles.push(
                {
                  headline: article.title,
                  snippet: article.abstract,
                  thumbnail: (article.media.length > 0) ? article.media[0]["media-metadata"][2].url : NYTLogo,
                  url: article.url
                }
            )
        })
        console.dir(articles);
        articles.map( (article, idx) => {
          cards.push( <NewsCard key={idx} article={article}/> );
        });

        this.setState({
          popNewsCards: cards
        });

        console.log('cards done');
      })
  }   
    
  render () {

    return (
      this.state.popNewsCards ?

      <NewsRow cards={this.state.popNewsCards}/>

      :

      <Loading />

    );
  }
}

function Loading (props){ 
  const classes = PopNewsStyles();

  // or <CircularProgress />
  return (
      <Box position="relative" top={200}>
        <div className={classes.progress}>
          <LinearProgress />
        </div>
      </Box>
  );
}

/*
<Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            <Grid item>
            <Card style={{height: 400, maxWidth: 300}}>
              <CardMedia
                component="img"
                style={{height: 0, paddingTop: '56.25%', marginTop: "30"}}
                image={NYTLogo}
                title="NYT-image"
              />
              <CardActionArea>
            <CardContent>
                <Typography variant="h5">
                    Test
                </Typography>
                <Typography gutterBottom variant="body2">
                    Text
                </Typography>
            </CardContent>
        </CardActionArea>
            </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
*/