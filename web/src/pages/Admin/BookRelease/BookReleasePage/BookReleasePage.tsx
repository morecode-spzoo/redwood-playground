import BookReleaseCell from 'src/components/Admin/BookRelease/BookReleaseCell';

type BookReleasePageProps = {
  id: string;
};

const BookReleasePage = ({ id }: BookReleasePageProps) => {
  return <BookReleaseCell id={id} />;
};

export default BookReleasePage;
