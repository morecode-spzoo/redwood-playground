import type { MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const updateSerieAddBooks: MutationResolvers['updateSerieAddBooks'] = ({
  serieId,
  books,
}) => {
  console.log('USER.LOG: Updating series: ', serieId);
  console.log(
    'USER.LOG: Adding books: ',
    books.map((book) => book.id)
  );

  return db.bookSerie.update({
    where: {
      id: serieId,
    },
    data: {
      books: {
        connect: books,
      },
    },
  });
};

export const updateSerieSetBooks: MutationResolvers['updateSerieSetBooks'] = ({
  serieId,
  serieData,
}) => {
  console.log('USER.LOG: Updating series: ', serieId);
  console.log('USER.LOG: SerieData: ', serieData);
  console.log(
    'USER.LOG: Setting books: ',
    serieData.books
      ? serieData.books?.map((book) => {
          return { id: book?.id };
        })
      : 'USER.LOG: No books in input to change'
  );

  return db.bookSerie.update({
    where: {
      id: serieId,
    },
    data: {
      ...serieData,
      books: {
        set: serieData?.books?.map((book) => {
          return { id: book?.id };
        }),
      },
      // we cannot do this since it will invoke error:
      /*
      Argument data.books.set of type BookWhereUniqueInput needs exactly one argument, but you provided id and title. Please choose one. Available args:
      type BookWhereUniqueInput {
        id?: String
        idCode?: String
      }
      but this type is not generated and cannot be used instead of BookInput
      */
      // books: {
      //   set: serieData?.books,
      // },
    },
  });
};

export const updateSerieRemoveBooks: MutationResolvers['updateSerieRemoveBooks'] =
  ({ serieId, books }) => {
    console.log('USER.LOG: Updating series: ', serieId);
    console.log(
      'USER.LOG: Removing books from serie: ',
      books.map((book) => book.id)
    );

    return db.bookSerie.update({
      where: {
        id: serieId,
      },
      data: {
        books: {
          disconnect: books,
        },
      },
    });
  };
