import type { EditBookById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BookForm from 'src/components/Admin/Book/BookForm'

export const QUERY = gql`
  query EditBookById($id: String!) {
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
const UPDATE_BOOK_MUTATION = gql`
  mutation UpdateBookMutation($id: String!, $input: UpdateBookInput!) {
    updateBook(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ book }: CellSuccessProps<EditBookById>) => {
  const [updateBook, { loading, error }] = useMutation(UPDATE_BOOK_MUTATION, {
    onCompleted: () => {
      toast.success('Book updated')
      navigate(routes.adminBooks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateBook({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Book {book.id}</h2>
      </header>
      <div className="rw-segment-main">
        <BookForm book={book} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
