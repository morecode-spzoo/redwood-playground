import type { FindBookSeries } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import BookSeries from 'src/components/Admin/BookSerie/BookSeries';

export const QUERY = gql`
  query FindBookSeries {
    bookSeries {
      id
      idCode
      title
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No bookSeries yet. '}
      <Link to={routes.adminNewBookSerie()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({ bookSeries }: CellSuccessProps<FindBookSeries>) => {
  return <BookSeries bookSeries={bookSeries} />;
};
