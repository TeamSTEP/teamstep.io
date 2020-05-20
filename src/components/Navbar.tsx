// import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import CameraIcon from '@material-ui/icons/PhotoCamera';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import { ThemeColors } from '../styles/themes';

// const Navbar = () => {
//     const useStyles = makeStyles(theme => ({
//         icon: {
//             marginRight: theme.spacing(2),
//         },
//         offset: theme.mixins.toolbar,
//         navbar: {
//             backgroundColor: ThemeColors.darkGrey
//         }
//     }));

//     const classes = useStyles();

//     return (
//         <>
//             <CssBaseline />
//             <AppBar position="fixed" className={classes.navbar}>
//                 <Toolbar>
//                     <CameraIcon className={classes.icon} />
//                     <Typography variant="h6" color="inherit" noWrap>
//                         Team STEP
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             <div className={classes.offset} />
//         </>
//     );
// }

// export default Navbar;

import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import stepLogo from '../assets/img/step_logo.svg';
import { Links } from '../data/links';
import { ThemeColors } from '../styles/themes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        navbar: {
            backgroundColor: ThemeColors.darkGrey,
        },
        logoIcon: {
            marginRight: theme.spacing(2),
            maxHeight: 46,
        },
        title: {
            display: 'block',
        },
        inputRoot: {
            color: 'inherit',
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        listItem: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }),
);

export default function Navbar() {
    const classes = useStyles();
    //const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    //const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    // const handleMenuClose = () => {
    //     setAnchorEl(null);
    //     handleMobileMenuClose();
    // };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-see-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton
                    aria-label="account of current user"
                    color="inherit"
                    href={Links.twitter}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <TwitterIcon />
                </IconButton>
            </MenuItem>
            <MenuItem>
                <IconButton
                    aria-label="account of current user"
                    color="inherit"
                    href={Links.github}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <GitHubIcon />
                </IconButton>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="open homepage">
                        <img className={classes.logoIcon} src={stepLogo} alt="" />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Team STEP
                    </Typography>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            aria-label="show twitter"
                            color="inherit"
                            href={Links.twitter}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <TwitterIcon />
                        </IconButton>
                        <IconButton
                            aria-label="show github"
                            color="inherit"
                            href={Links.github}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <GitHubIcon />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </div>
    );
}