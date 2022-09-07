import humanize from 'humanize-string';

import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/Admin/BookRelease/BookReleasesCell';

const DELETE_BOOK_RELEASE_MUTATION = gql`
  mutation DeleteBookReleaseMutation($id: String!) {
    deleteBookRelease(id: $id) {
      id
    }
  }
`;

const MAX_STRING_LENGTH = 150;

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

const truncate = (text) => {
  let output = text;
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...';
  }
  return output;
};

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2));
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

const BookReleasesList = ({ bookReleases }) => {
  const [deleteBookRelease] = useMutation(DELETE_BOOK_RELEASE_MUTATION, {
    onCompleted: () => {
      toast.success('BookRelease deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete bookRelease ' + id + '?')) {
      deleteBookRelease({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Release date</th>
            <th>Release title</th>
            <th>Publisher</th>
            <th>Cover type</th>
            <th>Release info</th>
            <th>Country</th>
            <th>Language</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Book id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {bookReleases.map((bookRelease) => (
            <tr key={bookRelease.id}>
              <td>{truncate(bookRelease.id)}</td>
              <td>{timeTag(bookRelease.releaseDate)}</td>
              <td>{truncate(bookRelease.releaseTitle)}</td>
              <td>{truncate(bookRelease.publisher)}</td>
              <td>{truncate(bookRelease.coverType)}</td>
              <td>{truncate(bookRelease.releaseInfo)}</td>
              <td>{truncate(bookRelease.country)}</td>
              <td>{truncate(bookRelease.language)}</td>
              <td>{timeTag(bookRelease.createdAt)}</td>
              <td>{timeTag(bookRelease.updatedAt)}</td>
              <td>{truncate(bookRelease.bookId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.adminBookRelease({ id: bookRelease.id })}
                    title={'Show bookRelease ' + bookRelease.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.adminEditBookRelease({ id: bookRelease.id })}
                    title={'Edit bookRelease ' + bookRelease.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete bookRelease ' + bookRelease.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(bookRelease.id)}
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
  );
};

export default BookReleasesList;
