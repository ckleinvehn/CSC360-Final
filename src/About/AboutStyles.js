import { makeStyles } from '@material-ui/core/styles';
import { FaFileExcel } from 'react-icons/fa';

const AboutStyles = makeStyles(theme => ({
    root: {
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
    },

    technologies: {
        display: 'flex',
        overflow: 'auto',
        justifyContent: 'center',
    },
}));

export default AboutStyles;