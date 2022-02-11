/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MembersQuery
// ====================================================

export interface MembersQuery_mdx_frontmatter_banner_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface MembersQuery_mdx_frontmatter_banner_childImageSharp {
  fluid: MembersQuery_mdx_frontmatter_banner_childImageSharp_fluid | null;
  id: string;
}

export interface MembersQuery_mdx_frontmatter_banner {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  /**
   * Returns the first child node of type ImageSharp or null if there are no children of given type on this node
   */
  childImageSharp: MembersQuery_mdx_frontmatter_banner_childImageSharp | null;
}

export interface MembersQuery_mdx_frontmatter {
  name: string | null;
  title: string;
  description: string | null;
  banner: MembersQuery_mdx_frontmatter_banner | null;
}

export interface MembersQuery_mdx {
  body: string;
  frontmatter: MembersQuery_mdx_frontmatter | null;
}

export interface MembersQuery {
  mdx: MembersQuery_mdx | null;
}

export interface MembersQueryVariables {
  slug: string;
}
