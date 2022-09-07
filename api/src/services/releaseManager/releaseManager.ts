import type { QueryResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const findReleasesBetween: QueryResolvers['findReleasesBetween'] = ({
  startDate,
  endDate,
}) => {
  db.bookRelease.findMany({
    where: {
      releaseDate: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
};
