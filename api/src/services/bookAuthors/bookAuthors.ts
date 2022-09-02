import type {
  QueryResolvers,
  MutationResolvers,
  BookAuthorResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const bookAuthors: QueryResolvers['bookAuthors'] = () => {
  return db.bookAuthor.findMany()
}

export const bookAuthor: QueryResolvers['bookAuthor'] = ({ id }) => {
  return db.bookAuthor.findUnique({
    where: { id },
  })
}

export const createBookAuthor: MutationResolvers['createBookAuthor'] = ({
  input,
}) => {
  return db.bookAuthor.create({
    data: input,
  })
}

export const updateBookAuthor: MutationResolvers['updateBookAuthor'] = ({
  id,
  input,
}) => {
  return db.bookAuthor.update({
    data: input,
    where: { id },
  })
}

export const deleteBookAuthor: MutationResolvers['deleteBookAuthor'] = ({
  id,
}) => {
  return db.bookAuthor.delete({
    where: { id },
  })
}

export const BookAuthor: BookAuthorResolvers = {
  author: (_obj, { root }) =>
    db.bookAuthor.findUnique({ where: { id: root.id } }).author(),
  book: (_obj, { root }) =>
    db.bookAuthor.findUnique({ where: { id: root.id } }).book(),
}
