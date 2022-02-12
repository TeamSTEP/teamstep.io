import { siteMetadata } from './config';
import tailwindConfig from './tailwind.config';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

const plugins = [
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
    {
        resolve: "gatsby-plugin-firebase",
        options: {
             features: {
              auth: false,
              database: false,
              firestore: false,
              storage: false,
              messaging: false,
              functions: false,
              performance: false,
              analytics:true,
             },
             credentials: {
               apiKey: process.env.APIKEY,
               authDomain: process.env.AUTH_DOMAIN,
               projectId: process.env.PROJECT_ID,
               storageBucket: process.env.STORAGE_BUCKET,
               messagingSenderId: process.env.MESSAGING_SENDER_ID,
               appId: process.env.APP_ID,
               measurementId: process.env.MEASUREMENT_ID
            },
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
