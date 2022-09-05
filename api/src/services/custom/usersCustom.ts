import type { QueryResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const seekUsersBy: QueryResolvers['seekUsersBy'] = ({ firstName }) => {
  return db.user.findMany({
    where: {
      firstName: {
        contains: firstName,
        // mode: 'insensitive', //required only for PostgreSQL, for SQLite it's default behaviour
      },
    },
  });
};
