import type { FindBookById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Book from 'src/components/Admin/Book/Book'

export const QUERY = gql`
  query FindBookById($id: String!) {
    book: book(id: $id) {
      id
      idCode
      title
      series
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Book not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ book }: CellSuccessProps<FindBookById>) => {
  return <Book book={book} />
}
