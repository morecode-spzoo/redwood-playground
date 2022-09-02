import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import BookReleaseForm from 'src/components/Admin/BookRelease/BookReleaseForm'

const CREATE_BOOK_RELEASE_MUTATION = gql`
  mutation CreateBookReleaseMutation($input: CreateBookReleaseInput!) {
    createBookRelease(input: $input) {
      id
    }
  }
`

const NewBookRelease = () => {
  const [createBookRelease, { loading, error }] = useMutation(
    CREATE_BOOK_RELEASE_MUTATION,
    {
      onCompleted: () => {
        toast.success('BookRelease created')
        navigate(routes.adminBookReleases())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createBookRelease({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New BookRelease</h2>
      </header>
      <div className="rw-segment-main">
        <BookReleaseForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewBookRelease
