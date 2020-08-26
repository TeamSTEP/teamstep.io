import React from 'react';
import TitleMastHead from './Sections/TitleMastHead';
//import AboutUs from './Sections/AboutUs';
import { CssBaseline } from '@material-ui/core';
//import WhatWeMake from './Sections/WhatWeMake';

const LandingPage = () => {
    return (
        <>
            <CssBaseline />
            <TitleMastHead />

            {/* <AboutUs />
            <WhatWeMake /> */}
        </>
    );
};

export default LandingPage;
