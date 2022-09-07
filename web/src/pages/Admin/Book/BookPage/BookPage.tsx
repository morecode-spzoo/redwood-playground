import BookCell from 'src/components/Admin/Book/BookCell';

type BookPageProps = {
  id: string;
};

const BookPage = ({ id }: BookPageProps) => {
  return <BookCell id={id} />;
};

export default BookPage;
