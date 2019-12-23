import gql from 'graphql-tag';

export const QUERY_USER_REPO = gql`
        query searchUserRepo($cursor: String!, $username: String!) {
            repositoryOwner(login: $username) {
                repositories(first: 20, orderBy: {direction: DESC, field: CREATED_AT}, after: $cursor) {
                    totalCount
                    edges {
                        node {
                            id,
                            name,
                            url,
                            description,
                            primaryLanguage {
                                name
                            },
                            updatedAt,
                            object(expression: "master:README.md") {
                                ... on Blob {
                                  text
                                }
                            }
                        }
                    }
                    pageInfo {
                        endCursor
                        hasNextPage
                    }
                }
            }
        }
    `;
