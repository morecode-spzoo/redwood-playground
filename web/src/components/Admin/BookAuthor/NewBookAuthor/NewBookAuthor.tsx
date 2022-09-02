import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BookAuthorForm from 'src/components/Admin/BookAuthor/BookAuthorForm'

const CREATE_BOOK_AUTHOR_MUTATION = gql`
  mutation CreateBookAuthorMutation($input: CreateBookAuthorInput!) {
    createBookAuthor(input: $input) {
      id
    }
  }
`

const NewBookAuthor = () => {
  const [createBookAuthor, { loading, error }] = useMutation(
    CREATE_BOOK_AUTHOR_MUTATION,
    {
      onCompleted: () => {
        toast.success('BookAuthor created')
        navigate(routes.adminBookAuthors())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createBookAuthor({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New BookAuthor</h2>
      </header>
      <div className="rw-segment-main">
        <BookAuthorForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewBookAuthor
