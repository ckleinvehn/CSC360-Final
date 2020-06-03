/**
 * Brandon Hernandez, Christian Kleinvehn
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
        position: 'relative',
    },

    tag: {
        marginLeft: '.5rem',
        marginBottom: '.5rem',
        
    },

    notOpened: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },

    opened: {
        position: 'static'
    },

    readMore: {
        position: 'relative',
        bottom: 10,
    },

    readMoreOpen: {
        position: 'relative',
        bottom: 10,
    },

    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },

    expandOpen: {
        transform: 'rotate(180deg)',
    },

    relativeFlow: {
        position: 'relative'
    },

    absoluteFlow: {
        position: 'absolute',
        zIndex: 1,
        overflowY: 'auto'
    }
}));

export default homeStyles;
