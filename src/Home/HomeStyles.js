/**
 * Brandon Hernandez
 */

import { makeStyles } from '@material-ui/core/styles';

const homeStyles = makeStyles(theme => ({
    article: {
        width: 300,
        height: '100%',
        position: 'relative',
    },

    thumbnail: {
        height: 220,
    },

    tags: {
        marginTop: '1rem',
    },

    tag: {
        marginLeft: '.5rem',
        marginTop: '.5rem',
    },

    readMore: {
        bottom: 10,
        right: 10,
        position: 'absolute',
    },   
}));

export default homeStyles;
