import BookSerieCell from 'src/components/Admin/BookSerie/BookSerieCell'

type BookSeriePageProps = {
  id: string
}

const BookSeriePage = ({ id }: BookSeriePageProps) => {
  return <BookSerieCell id={id} />
}

export default BookSeriePage
