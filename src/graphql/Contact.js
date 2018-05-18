import gql from 'graphql-tag';

// Declare Get All Contact GraphQL Mutation
export const getAllContactsQuery = gql`
  query getAllContactsQuery {
    getAllContacts {
      id
      firstName
      lastName
      email
    }
  }
`;
// Declare Add Contact GraphQL Mutation
export const createContactMutation = gql`
  mutation($firstName: String!, $lastName: String, $email: String) {
    createContact(firstName: $firstName, lastName: $lastName, email: $email) {
      ok
      errors {
        path
        message
      }
      contact {
        firstName
        lastName
        email
      }
    }
  }
`;
// Declare Edit Contact GraphQL Mutation
export const updateContactMutation = gql`
  mutation($id: Int!, $firstName: String, $lastName: String, $email: String) {
    updateContact(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      ok
      errors {
        path
        message
      }
      contact {
        firstName
        lastName
        email
      }
    }
  }
`;

// Declare Add Contact GraphQL Mutation
export const deleteContactMutation = gql`
  mutation($id: Int!) {
    deleteContact(id: $id) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
