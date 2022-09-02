import EditBookAuthorCell from 'src/components/Admin/BookAuthor/EditBookAuthorCell'

type BookAuthorPageProps = {
  id: string
}

const EditBookAuthorPage = ({ id }: BookAuthorPageProps) => {
  return <EditBookAuthorCell id={id} />
}

export default EditBookAuthorPage
