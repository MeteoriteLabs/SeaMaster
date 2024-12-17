import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation CreateChat($data: ChatInput!) {
    createChat(data: $data) {
      ConversationTitle
      documentId
    }
  }
`;
