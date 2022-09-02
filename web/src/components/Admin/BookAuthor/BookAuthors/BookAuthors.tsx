import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Admin/BookAuthor/BookAuthorsCell'

const DELETE_BOOK_AUTHOR_MUTATION = gql`
  mutation DeleteBookAuthorMutation($id: String!) {
    deleteBookAuthor(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const BookAuthorsList = ({ bookAuthors }) => {
  const [deleteBookAuthor] = useMutation(DELETE_BOOK_AUTHOR_MUTATION, {
    onCompleted: () => {
      toast.success('BookAuthor deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete bookAuthor ' + id + '?')) {
      deleteBookAuthor({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Author id</th>
            <th>Book id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {bookAuthors.map((bookAuthor) => (
            <tr key={bookAuthor.id}>
              <td>{truncate(bookAuthor.id)}</td>
              <td>{timeTag(bookAuthor.createdAt)}</td>
              <td>{timeTag(bookAuthor.updatedAt)}</td>
              <td>{truncate(bookAuthor.authorId)}</td>
              <td>{truncate(bookAuthor.bookId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminBookAuthor({ id: bookAuthor.id })}
                    title={'Show bookAuthor ' + bookAuthor.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditBookAuthor({ id: bookAuthor.id })}
                    title={'Edit bookAuthor ' + bookAuthor.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete bookAuthor ' + bookAuthor.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(bookAuthor.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookAuthorsList
