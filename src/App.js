import React, { useState } from "react";
import Bar from "./BarChart";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./App.css";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "orange",
  },
  logo: {
    outline: "solid",
    padding: "0.5rem",
    borderRadius: "2rem",
    "&:hover": { color: "lightgrey", transform: "scale(1.1)" },
  },
  barItems: {
    paddingLeft: "1rem",
  },
  links: {
    color: "white",
    textDecoration: "none",
    "&:hover": {
      color: "lightgrey",
      transform: "scale(1.3)",
      textDecoration: "underline",
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  home: {
    textAlign: "center",
    animation: "slide",
    animationDuration: "5s",
    animationIterationCount: "1",
    animationPlayState: "running",
  },
  "@keyframes slide": {
    "0%": {
      opacity: 0,
    },
    "50%": {
      opacity: 0.5,
    },
    "100%": {
      topacity: 1,
    },
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography className={classes.logo} variant="h6" noWrap>
              <Link className={classes.links} to="/">
                {" "}
                NYT - Archiver
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
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Toolbar />
      <Typography paragraph>
        <h1 className={classes.home}> WELCOME TO OUR PROJECT</h1>
      </Typography>
    </main>
  );
}

function Welcome({ match, location }) {
  const classes = useStyles();
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
  const classes = useStyles();
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
