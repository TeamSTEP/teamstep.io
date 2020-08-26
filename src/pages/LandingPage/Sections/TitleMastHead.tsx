import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import StepLogo from '../../../assets/img/step_logo.svg';
import { ThemeColors } from '../../../styles/themes';
import Particles from 'react-tsparticles';
import ReactTypingEffect from 'react-typing-effect';

const TitleMastHead = () => {
    const useStyles = makeStyles((theme) => ({
        background: {
            position: 'absolute',
            padding: theme.spacing(8, 0, 6),
            height: '100vh',
            width: '100%',
            //backgroundColor: ThemeColors.black,
        },
        particles: {
            position: 'absolute',
            left: '0px',
            bottom: '0px',
            width: '100%',
            height: '100vh',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        logo: {
            width: '100%',
            maxHeight: 230,
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
        <div>
            <div className={classes.background} id="title-masthead">
                <img className={classes.logo} src={StepLogo} alt="" />
                <Typography component="h1" variant="h2" align="center" className={classes.textPrimary} gutterBottom>
                    <ReactTypingEffect text="Team STEP" />
                </Typography>

                <Typography variant="h5" align="center" className={classes.textSecondary} paragraph>
                    Making the world more enjoyable, one step at a time
                </Typography>
            </div>
            <Particles
                id="tsparticles"
                options={{
                    fpsLimit: 60,
                    interactivity: {
                        detect_on: 'canvas',
                        events: {
                            onclick: { enable: true, mode: 'repulse' },
                            onhover: {
                                enable: true,
                                mode: 'bubble',
                                parallax: { enable: false, force: 2, smooth: 10 },
                            },
                            resize: true,
                        },
                        modes: {
                            bubble: { distance: 200, duration: 2, opacity: 0, size: 0, speed: 3 },
                            grab: { distance: 400, line_linked: { opacity: 1 } },
                            push: { particles_nb: 4 },
                            remove: { particles_nb: 2 },
                            repulse: { distance: 400, duration: 0.4 },
                        },
                    },
                    particles: {
                        color: { value: '#ffffff' },
                        line_linked: {
                            color: '#ffffff',
                            distance: 150,
                            enable: false,
                            opacity: 0.4,
                            width: 1,
                        },
                        move: {
                            attract: { enable: false, rotateX: 600, rotateY: 600 },
                            bounce: false,
                            direction: 'none',
                            enable: true,
                            out_mode: 'out',
                            random: true,
                            speed: 0.3,
                            straight: false,
                        },
                        number: { density: { enable: true, value_area: 800 }, value: 600 },
                        opacity: {
                            anim: { enable: true, opacity_min: 0.3, speed: 5, sync: false },
                            random: {
                                enable: true,
                                minimumValue: 0.3,
                            },
                            value: 0.6,
                        },
                        shape: {
                            type: 'circle',
                        },
                        size: {
                            anim: { enable: false, size_min: 0.3, speed: 4, sync: false },
                            random: false,
                            value: 1,
                        },
                    },
                    retina_detect: true,
                }}
            />
        </div>
    );
};

export default TitleMastHead;
