import type {
  QueryResolvers,
  MutationResolvers,
  BookReleaseResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const bookReleases: QueryResolvers['bookReleases'] = () => {
  return db.bookRelease.findMany();
};

export const bookRelease: QueryResolvers['bookRelease'] = ({ id }) => {
  return db.bookRelease.findUnique({
    where: { id },
  });
};

export const createBookRelease: MutationResolvers['createBookRelease'] = ({
  input,
}) => {
  return db.bookRelease.create({
    data: input,
  });
};

export const updateBookRelease: MutationResolvers['updateBookRelease'] = ({
  id,
  input,
}) => {
  return db.bookRelease.update({
    data: input,
    where: { id },
  });
};

export const deleteBookRelease: MutationResolvers['deleteBookRelease'] = ({
  id,
}) => {
  return db.bookRelease.delete({
    where: { id },
  });
};

export const BookRelease: Partial<BookReleaseResolvers> = {
  book: (_obj, { root }) =>
    db.bookRelease.findUnique({ where: { id: root.id } }).book(),
};
