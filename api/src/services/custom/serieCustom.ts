import type { MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const updateSerieAddBooks: MutationResolvers['updateSerieAddBooks'] = ({
  serieId,
  books,
}) => {
  console.log('Updating series: ', serieId);
  console.log(
    'Adding books: ',
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
  books,
}) => {
  console.log('Updating series: ', serieId);
  console.log(
    'Setting books: ',
    books.map((book) => book.id)
  );

  return db.bookSerie.update({
    where: {
      id: serieId,
    },
    data: {
      books: {
        set: books,
      },
    },
  });
};

export const updateSerieRemoveBooks: MutationResolvers['updateSerieRemoveBooks'] =
  ({ serieId, books }) => {
    console.log('Updating series: ', serieId);
    console.log(
      'Removing books from serie: ',
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
