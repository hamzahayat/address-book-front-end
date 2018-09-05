import gql from 'graphql-tag';

export const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
      userName
    }
  }
`;

export const registerMutation = gql`
  mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    registerUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
