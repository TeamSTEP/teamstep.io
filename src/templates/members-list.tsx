import React from 'react';
import { graphql, PageProps } from 'gatsby';
import Layout from '../components/layout';
import MembersItem from '../components/item-members';
import Pagination from '../components/pagination';
import { MembersListQuery } from './__generated__/MembersListQuery';

export default function membersList({
    data,
    pageContext,
    location,
}: PageProps<MembersListQuery, {}>) {
    const membersItems = data.allMdx.edges.map((item) => (
        <MembersItem data={item.node} key={item.node.id} />
    ));

    return (
        <Layout
            seo={{
                title: 'Team Members',
            }}
            location={location}
        >
            <div className="container mx-auto py-12">
                <div className="title py-12 text-center">
                    <h2 className="font-black text-5xl text-color-1">
                        Team Members
                    </h2>
                </div>
                <div className="flex flex-wrap">{membersItems}</div>
                <Pagination pageContext={pageContext} type="members" />
            </div>
        </Layout>
    );
}

export const query = graphql`
    query MembersListQuery($skip: Int!, $limit: Int!) {
        allMdx(
            filter: { fields: { sourceName: { eq: "members" } } }
            sort: { fields: [frontmatter___date], order: DESC }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        name
                        title
                        description
                        image {
                            publicURL
                            childImageSharp {
                                fluid(maxWidth: 720) {
                                    srcSet
                                    ...GatsbyImageSharpFluid
                                }
                                id
                            }
                        }
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;
