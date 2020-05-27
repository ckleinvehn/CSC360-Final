import { makeStyles } from "@material-ui/core/styles";

const PopNewsStyles = makeStyles( (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: "auto",
        spacing: 6,
        cellHeight: 450,
        gridGap: 6,
    },
    popCard: {
        maxWidth: 500,
    },
    progress: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
    customBttn: {
        bottom: "0",
        position: "relative",
    },
    thumbnail: {
        height: 220,
    },
    defaultThumb: {
        height: 220,
    }
}));

export default PopNewsStyles;