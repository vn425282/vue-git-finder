import gql from 'graphql-tag';

export const QUERY_USER_INFO = gql`
query searchUserInfo($username: String!) {
  user(login: $username) {
    name
    avatarUrl
    login
    location
    createdAt
  }
}
`
