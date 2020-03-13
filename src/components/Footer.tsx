import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { ThemeColors } from '../styles/themes';
import { Links } from '../data/links';

function Copyright() {
    return (
        <Typography variant="body2">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Team STEP
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    socialIcon: {
        color: 'white',
        fontSize: 60,
        paddingLeft: theme.spacing(1),
    },
    footerText: {
        color: ThemeColors.lightGrey,
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor: ThemeColors.darkGrey,
    },
}));

export default function StickyFooter() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1" component="h1" align="center" className={classes.footerText}>
                        Social media &amp; Contacts
                        <div className="col align-self-center">
                            <a href={Links.facebook} rel="noopener noreferrer" target="_blank">
                                <FacebookIcon className={classes.socialIcon} />
                            </a>
                            <a href={Links.twitter} rel="noopener noreferrer" target="_blank">
                                <TwitterIcon className={classes.socialIcon} />
                            </a>
                            <a href={Links.linkedin} rel="noopener noreferrer" target="_blank">
                                <LinkedInIcon className={classes.socialIcon} />
                            </a>
                            <a href={Links.github} rel="noopener noreferrer" target="_blank">
                                <GitHubIcon className={classes.socialIcon} />
                            </a>
                        </div>
                        <Copyright />
                    </Typography>
                </Container>
            </footer>
        </div>
    );
}
