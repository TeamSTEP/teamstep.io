import React from 'react';
import TitleMastHead from './Sections/TitleMastHead';
import Album from './Sections/Albums';

const LandingPage = () => {
    return (
        <>
            <main>
                <TitleMastHead />
                <Album />
            </main>
        </>
    );
}

export default LandingPage;