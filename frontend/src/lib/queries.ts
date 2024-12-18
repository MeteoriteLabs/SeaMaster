import { gql } from "@apollo/client";

export const GET_CHATS = gql`
  query GetChats {
    chats {
      ConversationTitle
      FileName
      documentId
    }
  }
`;

export const GET_ACCOUNT = gql`
  query GetAccount($documentId: ID!) {
    usersPermissionsUser(documentId: $documentId) {
      account {
        documentId
      }
    }
  }
`;
