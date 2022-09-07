import type { FindBookReleaseById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import BookRelease from 'src/components/Admin/BookRelease/BookRelease';

export const QUERY = gql`
  query FindBookReleaseById($id: String!) {
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

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>BookRelease not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({
  bookRelease,
}: CellSuccessProps<FindBookReleaseById>) => {
  return <BookRelease bookRelease={bookRelease} />;
};
