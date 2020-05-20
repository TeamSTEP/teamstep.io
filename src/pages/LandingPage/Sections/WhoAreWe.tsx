import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SectionCard from '../../../components/SectionCard';
import { ThemeColors } from '../../../styles/themes';
import { Divider } from '@material-ui/core';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

const WhoAreWe = () => {
    const useStyles = makeStyles((theme) => ({
        content: {
            margin: 'auto',
            textAlign: 'center',
        },
        textPrimary: {
            color: ThemeColors.darkGrey,
            padding: theme.spacing(2, 0, 5),
        },
        textSecondary: {
            color: ThemeColors.white,
        },
        divIcon: {
            fontSize: '7rem',
            padding: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    return (
        <>
            <SectionCard color="light">
                <Container maxWidth="md" className={classes.content}>
                    <Typography component="h1" variant="h2" align="center" className={classes.textPrimary}>
                        Who are we?
                    </Typography>
                    <Divider />
                    <VideogameAssetIcon className={classes.divIcon} />
                    <SportsEsportsIcon className={classes.divIcon} />
                    <Typography component="p" variant="h4" align="center" className={classes.textSecondary}>
                        We are a team of game developers, different profession with a single goal of shipping a final
                        project.
                    </Typography>
                    <Typography component="p" variant="h4" align="center" className={classes.textSecondary}>
                        We love game both old and new.
                    </Typography>
                </Container>
            </SectionCard>
        </>
    );
};

export default WhoAreWe;
