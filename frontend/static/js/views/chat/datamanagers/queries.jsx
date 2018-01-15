import gql from 'graphql-tag'

export const CurentUserQuery = gql`
  query CurentUserQuery {
    me {
      id
      email
      firstName
      lastName
    }
  }
`

export const ChatsQuery = gql`
  query ChatsQuery {
    chats {
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
`
