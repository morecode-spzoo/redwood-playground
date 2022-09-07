import EditBookCell from 'src/components/Admin/Book/EditBookCell';

type BookPageProps = {
  id: string;
};

const EditBookPage = ({ id }: BookPageProps) => {
  return <EditBookCell id={id} />;
};

export default EditBookPage;
