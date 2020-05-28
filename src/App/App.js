// React
import React from 'react';

// Material-UI
import { AppBar, CssBaseline, IconButton, Toolbar, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

// React Router
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';

/* Ours */
// CSS
import appStyles from './AppStyles';

// React Components
import Home from '../Home/Home';
import Trends from '../Trends/Trends';


export default function App() {
  const classes = appStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="static" className={classes.appBar}>
        <Toolbar>

          <Link className={classes.links} underline='none' to='/'>   
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <HomeIcon />
            </IconButton>
          </Link>

          <Link className={classes.links} to='/trends'>
            <Typography className={classes.barItems}>Trends</Typography>
          </Link>
          
          <Link className={classes.links} to='/browse'>
            <Typography className={classes.barItems}>Browse</Typography>
          </Link>

        </Toolbar>
      </AppBar>
      
      <Switch>
        <Route path='/trends'>
          <Trends />
        </Route>

        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
