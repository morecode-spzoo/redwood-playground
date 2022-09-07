import EditAuthorCell from 'src/components/Admin/Author/EditAuthorCell';

type AuthorPageProps = {
  id: string;
};

const EditAuthorPage = ({ id }: AuthorPageProps) => {
  return <EditAuthorCell id={id} />;
};

export default EditAuthorPage;
