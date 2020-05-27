import AppBar from "@material-ui/core/AppBar";
import AppStyles from "./AppStyles"
import Bar from "./BarChart";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import PopNews from "./PopNews"
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useState } from "react";
import { positions } from '@material-ui/system';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./App.css";

function App() {
  const classes = AppStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography className={classes.logo} variant="h6" noWrap>
              <Link className={classes.links} to="/">
                {" "}
                News Flash
              </Link>
            </Typography>
            <Typography
              variant="h6"
              className={classes.barItems}
              noWrap
              align="center"
            >
              <Link className={classes.links} underline="none" to="/">
                Graph1
              </Link>
            </Typography>

            <Typography
              variant="h6"
              className={classes.barItems}
              noWrap
              align="center"
            >
              <Link className={classes.links} to="welcome">
                Graph2
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/welcome" component={Graph1}></Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}



function Home() {
  const classes = AppStyles();
  return (
    <main className={classes.content}>
      <Toolbar />
      <Typography variant="h3" align="center" gutterBottom>
        <strong>CURRENT POPULAR NYTIMES ARTICLES</strong>
      </Typography>
      <PopNews />
      
    </main>
  );
}

function Welcome({ match, location }) {
  const classes = AppStyles();
  return (
    <main className={classes.content}>
      <Toolbar />
      <Typography paragraph>
        <h1 className={classes.home}> Welcome</h1>
      </Typography>
    </main>
  );
}
function Graph1() {
  const classes = AppStyles();
  return (
    <main className={classes.content}>
      <Toolbar />
      <Typography paragraph>
        <Bar></Bar>
      </Typography>
    </main>
  );
}

export default App;
