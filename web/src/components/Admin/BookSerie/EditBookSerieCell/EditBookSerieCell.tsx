import type { EditBookSerieById } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import BookSerieForm from 'src/components/Admin/BookSerie/BookSerieForm';

export const QUERY = gql`
  query EditBookSerieById($id: String!) {
    bookSerie: bookSerie(id: $id) {
      id
      idCode
      title
      #FIXME: Cannot query field "books" on type "BookSerie". Did you mean "Book"?GraphQL: Validation
      # unclear why this happens as graphql.d.ts definition for BookSerie type is:
      # export type BookSerie = {
      #   __typename?: 'BookSerie'
      #   books: Array<Maybe<Book>>
      #   createdAt: Scalars['DateTime']
      #   id: Scalars['String']
      #   idCode: Scalars['String']
      #   title: Scalars['String']
      #   updatedAt: Scalars['DateTime']
      # }
      books {
        id
        title
      }
      createdAt
      updatedAt
    }
    books {
      id
      title
    }
  }
`;
const UPDATE_BOOK_SERIE_MUTATION = gql`
  mutation UpdateBookSerieMutation(
    $id: String!
    $input: UpdateBookSerieInput!
  ) {
    updateBookSerie(id: $id, input: $input) {
      id
      idCode
      title
      books {
        id
        title
      }
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({
  bookSerie,
  books,
}: CellSuccessProps<EditBookSerieById>) => {
  const [updateBookSerie, { loading, error }] = useMutation(
    UPDATE_BOOK_SERIE_MUTATION,
    {
      onCompleted: () => {
        toast.success('BookSerie updated');
        navigate(routes.adminBookSeries());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input, id) => {
    updateBookSerie({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Book Series {bookSerie.title}
        </h2>
      </header>
      <div className="rw-segment-main">
        <BookSerieForm
          bookSerie={bookSerie}
          books={books}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
