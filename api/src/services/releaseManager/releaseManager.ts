import type { QueryResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const findReleasesBetween: QueryResolvers['findReleasesBetween'] = ({
  startDate,
  endDate,
}) => {
  return db.bookRelease.findMany({
    where: {
      releaseDate: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
};
