import type { EditBookReleaseById } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import BookReleaseForm from 'src/components/Admin/BookRelease/BookReleaseForm';

export const QUERY = gql`
  query EditBookReleaseById($id: String!) {
    bookRelease: bookRelease(id: $id) {
      id
      releaseDate
      releaseTitle
      publisher
      coverType
      releaseInfo
      country
      language
      createdAt
      updatedAt
      bookId
    }
  }
`;
const UPDATE_BOOK_RELEASE_MUTATION = gql`
  mutation UpdateBookReleaseMutation(
    $id: String!
    $input: UpdateBookReleaseInput!
  ) {
    updateBookRelease(id: $id, input: $input) {
      id
      releaseDate
      releaseTitle
      publisher
      coverType
      releaseInfo
      country
      language
      createdAt
      updatedAt
      bookId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({
  bookRelease,
}: CellSuccessProps<EditBookReleaseById>) => {
  const [updateBookRelease, { loading, error }] = useMutation(
    UPDATE_BOOK_RELEASE_MUTATION,
    {
      onCompleted: () => {
        toast.success('BookRelease updated');
        navigate(routes.adminBookReleases());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input, id) => {
    updateBookRelease({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit BookRelease {bookRelease.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <BookReleaseForm
          bookRelease={bookRelease}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
