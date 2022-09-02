import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_BOOK_SERIE_MUTATION = gql`
  mutation DeleteBookSerieMutation($id: String!) {
    deleteBookSerie(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const BookSerie = ({ bookSerie }) => {
  const [deleteBookSerie] = useMutation(DELETE_BOOK_SERIE_MUTATION, {
    onCompleted: () => {
      toast.success('BookSerie deleted')
      navigate(routes.adminBookSeries())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete bookSerie ' + id + '?')) {
      deleteBookSerie({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            BookSerie {bookSerie.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{bookSerie.id}</td>
            </tr>
            <tr>
              <th>Id code</th>
              <td>{bookSerie.idCode}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{bookSerie.title}</td>
            </tr>
            <tr>
              <th>Books in series</th>
              <td>{bookSerie.books?.map((book) => book.title + ', ')}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(bookSerie.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(bookSerie.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditBookSerie({ id: bookSerie.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(bookSerie.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default BookSerie
