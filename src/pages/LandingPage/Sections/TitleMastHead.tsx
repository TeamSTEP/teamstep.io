import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import StepLogo from '../../../assets/img/step_logo.svg';
import SectionCard from '../../../components/SectionCard';
import { ThemeColors } from '../../../styles/themes';

const TitleMastHead = () => {
    const useStyles = makeStyles(theme => ({
        logo: {
            width: '100%',
            maxHeight: 230
        },
        heroContent: {
            padding: theme.spacing(8, 0, 6),
        },
        heroButtons: {
            marginTop: theme.spacing(4),

        },
        btnPrimary: {
            backgroundColor: ThemeColors.darkRed,
            color: ThemeColors.lightGrey,
        },
        textPrimary: {
            color: ThemeColors.white,
        },
        textSecondary: {
            color: ThemeColors.lightGrey,
        }
    }));

    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <SectionCard color='dark'>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <img className={classes.logo} src={StepLogo} alt='' />
                        <Typography component="h1" variant="h2" align="center" className={classes.textPrimary} gutterBottom>
                            Team STEP
                        </Typography>
                        <Typography variant="h5" align="center" className={classes.textSecondary} paragraph>
                            Making the world more enjoyable, one step at a time
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" className={classes.btnPrimary}>
                                        Main call to action
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" className={classes.btnPrimary}>
                                        Secondary action
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </SectionCard>

        </>
    );
}

export default TitleMastHead;