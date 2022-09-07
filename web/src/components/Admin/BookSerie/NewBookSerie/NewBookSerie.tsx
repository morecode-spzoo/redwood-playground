import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import BookSerieForm from 'src/components/Admin/BookSerie/BookSerieForm';

const CREATE_BOOK_SERIE_MUTATION = gql`
  mutation CreateBookSerieMutation($input: CreateBookSerieInput!) {
    createBookSerie(input: $input) {
      id
    }
  }
`;

const NewBookSerie = () => {
  const [createBookSerie, { loading, error }] = useMutation(
    CREATE_BOOK_SERIE_MUTATION,
    {
      onCompleted: () => {
        toast.success('BookSerie created');
        navigate(routes.adminBookSeries());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input) => {
    createBookSerie({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New BookSerie</h2>
      </header>
      <div className="rw-segment-main">
        <BookSerieForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewBookSerie;
