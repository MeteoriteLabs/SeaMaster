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
