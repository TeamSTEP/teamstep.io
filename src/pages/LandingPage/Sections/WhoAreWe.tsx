import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SectionCard from '../../../components/SectionCard';
import { ThemeColors } from '../../../styles/themes';

const WhoAreWe = () => {
    const useStyles = makeStyles(theme => ({
        heroContent: {
            padding: theme.spacing(8, 0, 6),
        },
        textPrimary: {
            color: ThemeColors.darkGrey,
            padding: theme.spacing(2, 0, 5),
        },
        textSecondary: {
            color: ThemeColors.lightGrey,
        }
    }));

    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <SectionCard color='light'>
                <Container maxWidth="md">
                    <Typography component='h1' variant='h2' align='center' className={classes.textPrimary}>
                        Who are we?
                    </Typography>
                    <Typography component='p' variant='h4' align='center' className={classes.textSecondary}>
                        We are a team of game developers, different profession with a single goal of shipping a final project
                    </Typography>
                </Container>
            </SectionCard>

        </>
    );
}

export default WhoAreWe;