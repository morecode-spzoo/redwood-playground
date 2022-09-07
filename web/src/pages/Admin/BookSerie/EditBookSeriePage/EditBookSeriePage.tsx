import EditBookSerieCell from 'src/components/Admin/BookSerie/EditBookSerieCell';

type BookSeriePageProps = {
  id: string;
};

const EditBookSeriePage = ({ id }: BookSeriePageProps) => {
  return <EditBookSerieCell id={id} />;
};

export default EditBookSeriePage;
