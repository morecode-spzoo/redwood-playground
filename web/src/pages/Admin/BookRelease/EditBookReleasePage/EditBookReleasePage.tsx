import EditBookReleaseCell from 'src/components/Admin/BookRelease/EditBookReleaseCell'

type BookReleasePageProps = {
  id: string
}

const EditBookReleasePage = ({ id }: BookReleasePageProps) => {
  return <EditBookReleaseCell id={id} />
}

export default EditBookReleasePage
