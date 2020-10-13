const siteMetadata = {
    title: `Team STEP`,
    siteUrl: `https://teamstep.io`,
    capitalizeTitleOnHome: false,
    logo: `/images/logo.svg`,
    icon: `/images/icon.png`,
    titleImage: `/images/wall.png`,
    ogImage: `/images/wall.png`,
    twoColumnWall: true,
    cookiePolicy: true,
    introTag: `Making your day much more enjoyable, one step at a time.`,
    description: `Life is getting harder, we all have some issues with us, and as technology advances, we are given more time and opportunity to appreciate how horrible everything was.
    So why not try to have a little fun?`,
    about: `We are a team of aspiring indie game developers. We love to create games that combine art and technology. We believe that fun people make enjoyable games. Our goal is to become an indie studio that can allow people with creative minds to work freely without any financial burden. At the moment, Team STEP only has one on-going project under its belt, Catch.io, and we are still looking for people who would like to join our development team. If you are interested, please contact us!`,
    author: `@hoonsubin`,
    blogItemsPerPage: 10,
    portfolioItemsPerPage: 10,
    darkmode: true,
    switchTheme: true,
    navLinks: [
        {
            name: 'HOME',
            url: '/',
        },
        {
            name: 'ABOUT',
            url: '/about',
        },
        {
            name: 'POSTS',
            url: '/posts',
        },
        {
            name: 'PROJECTS',
            url: '/portfolio',
        },
        {
            name: 'CONTACT',
            url: '/contact',
        },
    ],
    footerLinks: [
        {
            name: 'PRIVACY POLICY',
            url: '/privacy-policy',
        },
        {
            name: 'GitHub',
            url: 'https://github.com/TeamSTEP',
        },
    ],
    social: [
        {
            name: 'Facebook',
            icon: '/images/Facebook.svg',
            url: '#',
        },
        {
            name: 'Twitter',
            icon: '/images/Twitter.svg',
            url: 'https://twitter.com/hoonsubin',
        },
        {
            name: 'Instagram',
            icon: '/images/Instagram.svg',
            url: '#',
        },
        {
            name: 'Youtube',
            icon: '/images/Youtube.svg',
            url: '#',
        },
    ],
    contact: {
        // leave empty ('') or false to hide form
        api_url: 'https://getform.io/f/f227a36e-096a-4c6a-9963-9f1918a85bb3',
        description: `If you are interested about our team or want to help our project grow, please consider contacting us!`,
        mail: 'hoonsubin11@gmail.com',
    },
    disqus: 'team-step.disqus.com',
};

const beforeContactFormSubmit = data => {
    // Code 0 - success
    // Code 1 - Name
    // Code 2 - Email
    // Code 3 - Message
    // Code 4 - Other
    const errors = [];

    if (data.name.trim().length < 2) {
        errors.push({
            code: 1,
            message: 'Enter a name',
        });
    }

    if (!data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        errors.push({
            code: 2,
            message: 'Enter a valid email address',
        });
    }

    if (data.message.trim().length < 15) {
        errors.push({
            code: 3,
            message: 'Enter a message with atleast 15 characters',
        });
    }

    if (errors.length > 0)
        return {
            result: false,
            errors: errors,
        };

    return {
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
        },
        result: true,
    };
};

const contactFormSubmit = async (api, data) => {
    let res: any = await fetch(api, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    res = await res.json();

    if (res.success) {
        return {
            result: true,
        };
    }
    return {
        result: false,
        ...res,
    };
};

const defaults = {
    disqus: null,
    twoColumnWall: true,
    darkmode: false,
    switchTheme: true,
    capitalizeTitleOnHome: true,
    cookiePolicy: false,
};

// replaces empty metadata with the default value
Object.keys(defaults).forEach(item => {
    if (siteMetadata[item] === undefined) {
        siteMetadata[item] = defaults[item];
    }
});

export { siteMetadata, beforeContactFormSubmit, contactFormSubmit };
