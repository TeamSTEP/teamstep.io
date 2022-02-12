import { siteMetadata } from './config';
import tailwindConfig from './tailwind.config';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

const plugins = [
    //Have to be placed before running other plugins
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        //idk why, if i use process.env.MEASUREMENT_ID it doesnt worked
        //anyway, tracking ID in GA 3 is measurement ID in GA 4 (our current setting)
        trackingId: "G-RFT6XHCSH1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Defers execution of google analytics script after page load
        defer: false,
        // defaults to false
        enableWebVitalsTracking: true,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-codegen`,
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `blog`,
            path: `${__dirname}/contents/blog/`,
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `members`,
            path: `${__dirname}/contents/members/`,
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `portfolio`,
            path: `${__dirname}/contents/portfolio/`,
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `basepages`,
            path: `${__dirname}/contents/basepages`,
        },
    },
    {
        resolve: `gatsby-plugin-mdx`,
        options: {
            gatsbyRemarkPlugins: [
                {
                    resolve: `gatsby-remark-images`,
                    options: {
                        maxWidth: 1200,
                    },
                },
            ],
        },
    },
    {
        resolve: `gatsby-plugin-postcss`,
        options: {
            postCssPlugins: [
                tailwindcss(tailwindConfig),
                autoprefixer,
                ...(process.env.NODE_ENV === `production`
                    ? [require(`cssnano`)]
                    : []),
            ],
        },
    },
    {
        resolve: 'gatsby-plugin-load-script',
        options: {
            src: 'https://cdn.jsdelivr.net/npm/pathseg@1.2.0/pathseg.min.js', // Change to the script filename
        },
    },
];

if (siteMetadata.disqus) {
    plugins.push({
        resolve: `gatsby-plugin-disqus`,
        options: {
            shortname: siteMetadata.disqus,
        },
    } as any);
}

export default {
    siteMetadata: siteMetadata,
    plugins: plugins,
};
