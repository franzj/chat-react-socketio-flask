import gql from 'graphql-tag'

export const ChatMutation = gql`
  mutation ChatMutation($email: String!) {
    createChat(email: $email) {
      chat {
        id
        users {
          id
          email
          firstName
          lastName
        }
        messages {
          user {
            firstName
          }
          date
          content
        }
        createdAt
      }
    }
  }
`
