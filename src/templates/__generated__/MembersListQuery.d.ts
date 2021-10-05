/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MembersListQuery
// ====================================================

export interface MembersListQuery_allMdx_edges_node_frontmatter_image_childImageSharp_fluid {
  srcSet: string;
  base64: string | null;
  aspectRatio: number;
  src: string;
  sizes: string;
}

export interface MembersListQuery_allMdx_edges_node_frontmatter_image_childImageSharp {
  fluid: MembersListQuery_allMdx_edges_node_frontmatter_image_childImageSharp_fluid | null;
  id: string;
}

export interface MembersListQuery_allMdx_edges_node_frontmatter_image {
  /**
   * Copy file to static directory and return public url to it
   */
  publicURL: string | null;
  childImageSharp: MembersListQuery_allMdx_edges_node_frontmatter_image_childImageSharp | null;
}

export interface MembersListQuery_allMdx_edges_node_frontmatter {
  name: string | null;
  title: string;
  description: string | null;
  image: MembersListQuery_allMdx_edges_node_frontmatter_image | null;
}

export interface MembersListQuery_allMdx_edges_node_fields {
  slug: string | null;
}

export interface MembersListQuery_allMdx_edges_node {
  id: string;
  frontmatter: MembersListQuery_allMdx_edges_node_frontmatter | null;
  fields: MembersListQuery_allMdx_edges_node_fields | null;
}

export interface MembersListQuery_allMdx_edges {
  node: MembersListQuery_allMdx_edges_node;
}

export interface MembersListQuery_allMdx {
  edges: MembersListQuery_allMdx_edges[];
}

export interface MembersListQuery {
  allMdx: MembersListQuery_allMdx;
}

export interface MembersListQueryVariables {
  skip: number;
  limit: number;
}
