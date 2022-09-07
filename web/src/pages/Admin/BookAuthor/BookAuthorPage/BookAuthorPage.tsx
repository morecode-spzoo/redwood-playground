import BookAuthorCell from 'src/components/Admin/BookAuthor/BookAuthorCell';

type BookAuthorPageProps = {
  id: string;
};

const BookAuthorPage = ({ id }: BookAuthorPageProps) => {
  return <BookAuthorCell id={id} />;
};

export default BookAuthorPage;
