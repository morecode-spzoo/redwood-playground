import type { FindBookReleases } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import BookReleases from 'src/components/Admin/BookRelease/BookReleases';

export const QUERY = gql`
  query FindBookReleases {
    bookReleases {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No bookReleases yet. '}
      <Link to={routes.adminNewBookRelease()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({
  bookReleases,
}: CellSuccessProps<FindBookReleases>) => {
  return <BookReleases bookReleases={bookReleases} />;
};
