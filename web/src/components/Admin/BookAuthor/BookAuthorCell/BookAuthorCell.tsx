import type { FindBookAuthorById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import BookAuthor from 'src/components/Admin/BookAuthor/BookAuthor'

export const QUERY = gql`
  query FindBookAuthorById($id: String!) {
    bookAuthor: bookAuthor(id: $id) {
      id
      createdAt
      updatedAt
      authorId
      bookId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>BookAuthor not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  bookAuthor,
}: CellSuccessProps<FindBookAuthorById>) => {
  return <BookAuthor bookAuthor={bookAuthor} />
}
