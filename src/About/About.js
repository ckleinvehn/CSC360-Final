/**
 * Brandon Hernandez
 */

 // React
 import React from "react";

 // Material-UI
import { 
  Button, Box, Card, CardActions, CardContent, CardMedia,
  Chip, Collapse, Grid, IconButton, LinearProgress, Paper, Typography
} from '@material-ui/core';
import { GrHeroku, GrGithub } from 'react-icons/gr';
import { FaReact } from 'react-icons/fa';
import { DiNodejs, DiJsBadge} from 'react-icons/di';
import nytIcon from '../images/nyt-icon.png';
import chartsIcon from '../images/charts-js.png';
import materialIcon from '../images/material-ui.png';

// About Styles
import AboutStyles from './AboutStyles';

export default function About (props) {
    const classes = AboutStyles();
    return (
        <div className={classes.root}>
            <Typography className={classes.centeritems} variant='h3'>
                Technologies Used
            </Typography>

            <Box className={classes.centeritems}>
                <a className={classes.icons} href="https://www.heroku.com/" target="_blank" rel='noopener noreferrer'
                    style={{color: "purple",}} title="Heroku">
                    <GrHeroku size='4rem' /></a>
                <a className={classes.icons} href="https://reactjs.org/" target="_blank" rel='noopener noreferrer'
                    style={{color: "aqua",}} title="ReactJS">
                    <FaReact size='4rem' /></a>
                <a className={classes.icons} href="https://material-ui.com/" target="_blank" rel='noopener noreferrer'
                    title="MaterialUI">
                    <img  alt="MeterialUI Icon" src={materialIcon} width="72rem" height="72rem"></img></a>
                <a className={classes.icons} href="https://www.javascript.com/" target="_blank" rel='noopener noreferrer'
                    style={{color: "gold",}} title="JavaScript">
                    <DiJsBadge size='4rem' /></a>
                <a className={classes.icons} href="https://nodejs.org/" target="_blank" rel='noopener noreferrer'
                    style={{color: "green",}} title="NodeJS">
                    <DiNodejs size='4rem' /></a>
                <a className={classes.icons} href="https://developer.nytimes.com/" target="_blank" rel='noopener noreferrer'
                     title="NYT API">
                    <img  alt="NYT Icon" src={nytIcon} width="72rem" height="72rem"></img></a>
                <a className={classes.icons} href="https://www.chartjs.org/" target="_blank" rel='noopener noreferrer'
                    title="ChartsJS">
                    <img  alt="ChartsJS Icon" src={chartsIcon} width="72rem" height="72rem"></img></a>
            </Box>
            <Card className={classes.card} variant="outlined" {...classes}>
                <CardContent>
                    <Typography variant='h5'>
                        Synopsis
                    </Typography>
                    <Typography variant='body1'>
                        As our final project in Web Development while at DePaul University,
                        we were given 3 major requirements to develop a ReactJS WebApp:
                    </Typography>
                        <ol>
                            <li>Embelish at least 2 routes</li>
                            <li>Integrate the use of a live API call for dynamic page renders</li>
                            <li>Render ChartsJS graphs from the retrieved API endpoint</li>
                        </ol>
                    <Typography variant='body1'>
                        Given the aformentioned requirements we decided to; utilize the NewYork
                        Times(NYT) API to create a feed of articles on the landing page, visualize trends
                        based on current trending keywords, and even functionality to query keywords
                        for personalized results.
                    </Typography>
                    <br></br>
                    <Typography variant='h5'>
                        Procedure
                    </Typography>
                    <Typography variant='body1'>
                        The front-end/UI is built on the ReactJS framework with the help of
                        Material-ui for clean and organized components. The charts are visualized
                        by the ChartsJS library and are dynamically rendered once an AJAX call
                        returns data from the NYT API. The NYT API can give us metadata such as,
                        keywords/tags, geo-tags, article links, thumbnail links, popular articles
                        etc. These of course can all be extrapulated and analyzed to display
                        the graphs and render the news feed. Of course all of these frameworks
                        are in JavaScript and as such our server is hosted through Heroku by
                        integrating NodeJS as the internal server.
                    </Typography>
                    <br></br>
                    <Typography variant='body2' style={{textAlign: 'right',}} >
                        Sourcecode: <a href='https://github.com/ckleinvehn/CSC360-Final' target="_blank" rel='noopener noreferrer'
                        style={{color: "black",}} title="GitHub Sourcecode"><GrGithub size='2rem' /></a>
                    </Typography>
                </CardContent>
            </Card>
            <Typography className={classes.centeritems} variant='body2' >
                <i>This project was developed by {' '}
                    <a href='https://github.com/brandonhdz' target='_blank' rel='noopener noreferrer'>Brandon Hernandez</a>, {' '}
                    <a href='https://github.com/ckleinvehn' target='_blank' rel='noopener noreferrer'>Christian Kleinvehn</a>, {' '}
                    <a href='https://github.com/phr-nk' target='_blank' rel='noopener noreferrer'>Frank Lenoci</a>, and {' '}
                    <a href='https://github.com/' target='_blank' rel='noopener noreferrer'>Rickey Serna</a>.
                </i>
            </Typography>
        </div>
    );
}