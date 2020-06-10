import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import StepLogo from '../../../assets/img/step_logo.svg';
import { ThemeColors } from '../../../styles/themes';
import Zoom from '@material-ui/core/Zoom';
import { Slide } from '@material-ui/core';

const TitleMastHead = () => {
    const useStyles = makeStyles((theme) => ({
        logo: {
            width: '100%',
            maxHeight: 230,
        },
        background: {
            padding: theme.spacing(8, 0, 6),
            height: '100vh',
            width: '100%',
            backgroundColor: ThemeColors.darkGrey,
        },
        textPrimary: {
            color: ThemeColors.white,
            padding: theme.spacing(3),
        },
        textSecondary: {
            color: ThemeColors.lightGrey,
        },
    }));

    const classes = useStyles();

    return (
        <>
            <div className={classes.background} id="title-masthead">
                <Container maxWidth="lg">
                    <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                        <img className={classes.logo} src={StepLogo} alt="" />
                    </Slide>
                    <Zoom in={true} style={{ transitionDelay: '800ms' }}>
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            className={classes.textPrimary}
                            gutterBottom
                        >
                            Team STEP
                        </Typography>
                    </Zoom>
                    <Zoom in={true} style={{ transitionDelay: '1000ms' }}>
                        <Typography variant="h5" align="center" className={classes.textSecondary} paragraph>
                            Making the world more enjoyable, one step at a time
                        </Typography>
                    </Zoom>
                </Container>
            </div>
        </>
    );
};

export default TitleMastHead;
