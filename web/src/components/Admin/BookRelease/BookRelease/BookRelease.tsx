import humanize from 'humanize-string';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

const DELETE_BOOK_RELEASE_MUTATION = gql`
  mutation DeleteBookReleaseMutation($id: String!) {
    deleteBookRelease(id: $id) {
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

const BookRelease = ({ bookRelease }) => {
  const [deleteBookRelease] = useMutation(DELETE_BOOK_RELEASE_MUTATION, {
    onCompleted: () => {
      toast.success('BookRelease deleted');
      navigate(routes.adminBookReleases());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete bookRelease ' + id + '?')) {
      deleteBookRelease({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            BookRelease {bookRelease.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{bookRelease.id}</td>
            </tr>
            <tr>
              <th>Release date</th>
              <td>{timeTag(bookRelease.releaseDate)}</td>
            </tr>
            <tr>
              <th>Release title</th>
              <td>{bookRelease.releaseTitle}</td>
            </tr>
            <tr>
              <th>Publisher</th>
              <td>{bookRelease.publisher}</td>
            </tr>
            <tr>
              <th>Cover type</th>
              <td>{bookRelease.coverType}</td>
            </tr>
            <tr>
              <th>Release info</th>
              <td>{bookRelease.releaseInfo}</td>
            </tr>
            <tr>
              <th>Country</th>
              <td>{bookRelease.country}</td>
            </tr>
            <tr>
              <th>Language</th>
              <td>{bookRelease.language}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(bookRelease.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(bookRelease.updatedAt)}</td>
            </tr>
            <tr>
              <th>Book id</th>
              <td>{bookRelease.bookId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.adminEditBookRelease({ id: bookRelease.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(bookRelease.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default BookRelease;
