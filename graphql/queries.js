import gql from "graphql-tag";

export const categories = gql`
  query {
    categories {
      data {
        id
        attributes {
          name
          icon
          slug
          description
          img
        }
      }
    }
  }
`; // query

export const category = gql`
  query ($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          name
          slug
        }
      }
    }
  }
`; //Query
