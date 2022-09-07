import type { FindBookAuthors } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import BookAuthors from 'src/components/Admin/BookAuthor/BookAuthors';

export const QUERY = gql`
  query FindBookAuthors {
    bookAuthors {
      id
      createdAt
      updatedAt
      authorId
      bookId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No bookAuthors yet. '}
      <Link to={routes.adminNewBookAuthor()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({ bookAuthors }: CellSuccessProps<FindBookAuthors>) => {
  return <BookAuthors bookAuthors={bookAuthors} />;
};
