import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ThemeColors } from '../styles/themes';

interface Props {
    color: 'light' | 'dark';
}

const TitleMastHead: React.FC<Props> = ({ color, children }) => {

    const useStyles = makeStyles(theme => ({
        paper: {
            backgroundColor: color === 'dark' ? ThemeColors.darkGrey : ThemeColors.white,
            padding: theme.spacing(8, 0, 6),
            margin: theme.spacing(1),
        },
    }));

    const classes = useStyles();

    return (
        <>
            <Container maxWidth='lg'>
                <Paper elevation={5} className={classes.paper}>
                    {children}
                </Paper>
            </Container>
        </>
    );
}

export default TitleMastHead;