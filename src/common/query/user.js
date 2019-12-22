import gql from 'graphql-tag'
export const GET_USER_INFO = gql`
        query {
          user(login:"vn425282") {
            name
            avatarUrl
            login
            location
            createdAt
        }
      }
    `;
