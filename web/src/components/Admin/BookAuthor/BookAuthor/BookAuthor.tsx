import humanize from 'humanize-string';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

const DELETE_BOOK_AUTHOR_MUTATION = gql`
  mutation DeleteBookAuthorMutation($id: String!) {
    deleteBookAuthor(id: $id) {
      id
    }
  }
`;

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value));
      return humanizedValues.join(', ');
    } else {
      return humanize(values as string);
    }
  }
};

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  );
};

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  );
};

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />;
};

const BookAuthor = ({ bookAuthor }) => {
  const [deleteBookAuthor] = useMutation(DELETE_BOOK_AUTHOR_MUTATION, {
    onCompleted: () => {
      toast.success('BookAuthor deleted');
      navigate(routes.adminBookAuthors());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete bookAuthor ' + id + '?')) {
      deleteBookAuthor({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            BookAuthor {bookAuthor.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{bookAuthor.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(bookAuthor.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(bookAuthor.updatedAt)}</td>
            </tr>
            <tr>
              <th>Author id</th>
              <td>{bookAuthor.authorId}</td>
            </tr>
            <tr>
              <th>Book id</th>
              <td>{bookAuthor.bookId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditBookAuthor({ id: bookAuthor.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(bookAuthor.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default BookAuthor;
