import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { graphql, PageProps } from 'gatsby';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { Row, Col } from '../components/shortcodes/index';

import Comments from '../components/comments';
import { MembersQuery } from './__generated__/MembersQuery';

export default function members({
    location,
    data,
}: PageProps<MembersQuery, {}>) {
    return (
        <Layout
            seo={{
                title: data.mdx.frontmatter.title,
                description: data.mdx.frontmatter.description,
                image: data.mdx.frontmatter.banner.publicURL,
            }}
            location={location}
        >
            <div className="md:px-4 mt-12 py-6 md:w-11/12 mx-auto">
                <div className="mx-auto relative">
                    {/* <Img
                        fluid={
                            data.mdx.frontmatter.banner.childImageSharp.fluid
                        }
                    /> */}
                    <div className="relative w-full lg:w-3/4 md:w-11/12 sm:w-full p-6 box-border lg:box-content mx-auto bg-bg text-color-default blog-wall-content shadow-xl md:-mt-16 ">
                        
                        <div className="p-3">
                            <Img fluid={data.mdx.frontmatter.banner.childImageSharp.fluid} className="rounded-full float-left h-16 w-16 mr-4"/>
                            <h1 className="text-5xl font-bold text-primary">
                                {data.mdx.frontmatter.name}
                            </h1>
                            <p className="mt-6">
                                {data.mdx.frontmatter.description}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="lg:w-3/4 md:w-11/12 sm:w-full p-3 mx-auto mt-12 post-content break-words">
                    <MDXProvider components={{ Row, Col }}>
                        <MDXRenderer>{data.mdx.body}</MDXRenderer>
                    </MDXProvider>
                </div>
                <div className="comments mt-8">
                    <Comments
                        title={data.mdx.frontmatter.title}
                        location={location}
                    />
                </div>
            </div>
        </Layout>
    );
}

export const query = graphql`
    query MembersQuery($slug: String!) {
        mdx(fields: { slug: { eq: $slug } }) {
            body
            frontmatter {
                name
                title
                description
                banner {
                    publicURL
                    childImageSharp {
                        fluid(maxWidth: 1920) {
                            srcSet
                            ...GatsbyImageSharpFluid
                        }
                        id
                    }
                }
            }
        }
    }
`;
