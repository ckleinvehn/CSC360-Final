import { makeStyles } from '@material-ui/core/styles';

const AppStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },

  appBar: {
    backgroundColor: '#3469A1',
  },

  barItems: {
    paddingLeft: '1.25rem',
  },

  links: {
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      color: 'lightgrey',
      textDecoration: 'underline',
    },
  },

  mainContent: {
    padding: '2rem 4rem',
  }
}));

export default AppStyles;
