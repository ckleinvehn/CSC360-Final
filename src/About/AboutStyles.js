import { makeStyles } from '@material-ui/core/styles';

const AboutStyles = makeStyles(theme => ({
    root: {
        padding: '1rem 4rem',
        justifyContent: 'center',
        alignItems: 'center',
    },

    centeritems: {
        textAlign: 'center',
    },

    card: {
      background: '#555',
      color: '#fff',
      padding: '2rem',
    },

    icons: {
        paddingRight: '1rem'
    }
}));

export default AboutStyles;