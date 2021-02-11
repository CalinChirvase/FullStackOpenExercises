import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            published
            author {
                name
                born
            }
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ) {
            title
            published
            genres
            author {
                name
                born
            }
        }
    }
`

export const SET_BIRTH_YEAR = gql`
    mutation setBirthYear($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            born
            bookCount
        }
    }
`