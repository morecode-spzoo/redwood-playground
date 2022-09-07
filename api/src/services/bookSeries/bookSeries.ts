import type {
  QueryResolvers,
  MutationResolvers,
  BookSerieResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const bookSeries: QueryResolvers['bookSeries'] = () => {
  return db.bookSerie.findMany();
};

export const bookSerie: QueryResolvers['bookSerie'] = ({ id }) => {
  return db.bookSerie.findUnique({
    where: { id },
  });
};

export const createBookSerie: MutationResolvers['createBookSerie'] = ({
  input,
}) => {
  return db.bookSerie.create({
    data: input,
  });
};

export const updateBookSerie: MutationResolvers['updateBookSerie'] = ({
  id,
  input,
}) => {
  return db.bookSerie.update({
    data: input,
    where: { id },
  });
};

export const deleteBookSerie: MutationResolvers['deleteBookSerie'] = ({
  id,
}) => {
  return db.bookSerie.delete({
    where: { id },
  });
};

export const BookSerie: Partial<BookSerieResolvers> = {
  books: (_obj, { root }) =>
    db.bookSerie.findUnique({ where: { id: root.id } }).books(),
};
