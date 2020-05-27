import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
const AppStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1
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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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

export default AppStyles;