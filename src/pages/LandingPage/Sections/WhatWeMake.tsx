import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SectionCard from '../../../components/SectionCard';
import { ThemeColors } from '../../../styles/themes';
import { Divider, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import CodeIcon from '@material-ui/icons/Code';
import { portfolioProjects } from '../../../data/profiles';

const WhatWeMake = () => {
    const useStyles = makeStyles((theme) => ({
        content: {
            margin: 'auto',
            textAlign: 'center',
        },
        textPrimary: {
            color: ThemeColors.white,
            padding: theme.spacing(2, 0, 5),
        },
        textSecondary: {
            color: ThemeColors.lightGrey,
        },
        divIcon: {
            fontSize: '7rem',
            padding: theme.spacing(2),
            color: ThemeColors.white,
        },
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        cardMedia: {
            paddingTop: '56.25%', // 16:9
        },
        cardContent: {
            flexGrow: 1,
        },
    }));

    const classes = useStyles();
    const cards = portfolioProjects;
    return (
        <>
            <SectionCard color="dark">
                <Container maxWidth="md" className={classes.content}>
                    <Typography component="h1" variant="h2" align="center" className={classes.textPrimary}>
                        What Do We Make?
                    </Typography>
                    <Divider />
                    <CreateIcon className={classes.divIcon} />
                    <DevicesOtherIcon className={classes.divIcon} />
                    <CodeIcon className={classes.divIcon} />
                    <Typography component="p" variant="h4" align="center" className={classes.textSecondary}>
                        We create games that span across multiple platforms with diverse genres.
                    </Typography>
                </Container>

                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((project) => (
                            <Grid item key={project.description} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {project.title}
                                        </Typography>
                                        <Typography>{project.description}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Screenshots
                                        </Button>
                                        {project.projectLink ? (
                                            <Button
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                                href={project.projectLink}
                                            >
                                                Project Page
                                            </Button>
                                        ) : (
                                            <></>
                                        )}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </SectionCard>
        </>
    );
};

export default WhatWeMake;
