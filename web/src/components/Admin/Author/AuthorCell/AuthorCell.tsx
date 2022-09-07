import type { FindAuthorById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import Author from 'src/components/Admin/Author/Author';

export const QUERY = gql`
  query FindAuthorById($id: String!) {
    author: author(id: $id) {
      id
      idCode
      penName
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Author not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({ author }: CellSuccessProps<FindAuthorById>) => {
  return <Author author={author} />;
};
