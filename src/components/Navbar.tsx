import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeColors } from '../styles/themes';

const Navbar = () => {
    const useStyles = makeStyles(theme => ({
        icon: {
            marginRight: theme.spacing(2),
        },
        offset: theme.mixins.toolbar,
        navbar: {
            backgroundColor: ThemeColors.darkGrey
        }
    }));

    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" className={classes.navbar}>
                <Toolbar>
                    <CameraIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        Team STEP
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </>
    );
}

export default Navbar;