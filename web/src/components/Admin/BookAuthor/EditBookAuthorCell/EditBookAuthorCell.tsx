import type { EditBookAuthorById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BookAuthorForm from 'src/components/Admin/BookAuthor/BookAuthorForm'

export const QUERY = gql`
  query EditBookAuthorById($id: String!) {
    bookAuthor: bookAuthor(id: $id) {
      id
      createdAt
      updatedAt
      authorId
      bookId
    }
  }
`
const UPDATE_BOOK_AUTHOR_MUTATION = gql`
  mutation UpdateBookAuthorMutation(
    $id: String!
    $input: UpdateBookAuthorInput!
  ) {
    updateBookAuthor(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      authorId
      bookId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({
  bookAuthor,
}: CellSuccessProps<EditBookAuthorById>) => {
  const [updateBookAuthor, { loading, error }] = useMutation(
    UPDATE_BOOK_AUTHOR_MUTATION,
    {
      onCompleted: () => {
        toast.success('BookAuthor updated')
        navigate(routes.adminBookAuthors())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateBookAuthor({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit BookAuthor {bookAuthor.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <BookAuthorForm
          bookAuthor={bookAuthor}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
