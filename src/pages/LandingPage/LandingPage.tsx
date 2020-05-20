import React from 'react';
import TitleMastHead from './Sections/TitleMastHead';
import WhoAreWe from './Sections/WhoAreWe';
import { CssBaseline } from '@material-ui/core';
import WhatWeMake from './Sections/WhatWeMake';

const LandingPage = () => {
    return (
        <>
            <CssBaseline />
            <TitleMastHead />

            <WhoAreWe />
            <WhatWeMake />
        </>
    );
};

export default LandingPage;
