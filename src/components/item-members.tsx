import React, { useState } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import { MembersListQuery_allMdx_edges_node } from '../templates/__generated__/MembersListQuery';
import { IndexPageQuery_members_edges_node } from '../pages/__generated__/IndexPageQuery';

type ItemMembersProps =
    | MembersListQuery_allMdx_edges_node
    | IndexPageQuery_members_edges_node;
export const ItemMembers: React.FC<{ data: ItemMembersProps }> = ({ data }) => {
    const [focused, changeFocused] = useState(false);

    return (
        <div className="blog-item w-full md:w-1/2 lg:w-1/3 p-4">
            <div
                className={`transition-all duration-300 hover:shadow-2xl shadow ${
                    focused && 'focused'
                }`}
            >
                <Link
                    to={data.fields.slug}
                    title={data.frontmatter.title}
                    onFocus={() => changeFocused(true)}
                    onBlur={() => changeFocused(false)}
                >
                    <div className="image">
                        <Img
                            fluid={data.frontmatter.image.childImageSharp.fluid}
                            alt={data.frontmatter.title}
                            className="w-full rounded-lg"
                        />
                    </div>
                    <div className="p-4 py-3">
                        <h4 className="text-color-2 font-black text-3xl pt-1">
                            {data.frontmatter.name}
                        </h4>
                        <p className="pb-1 text-secondary">
                            {data.frontmatter.title}
                        </p>
                        <p className="pt-3 text-color-default">
                            {data.frontmatter.description}
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ItemMembers;
