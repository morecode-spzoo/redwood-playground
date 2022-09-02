import type { FindBookSerieById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import BookSerie from 'src/components/Admin/BookSerie/BookSerie'

export const QUERY = gql`
  query FindBookSerieById($id: String!) {
    bookSerie: bookSerie(id: $id) {
      id
      idCode
      title
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>BookSerie not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ bookSerie }: CellSuccessProps<FindBookSerieById>) => {
  return <BookSerie bookSerie={bookSerie} />
}
