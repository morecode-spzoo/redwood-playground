import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.BookSerieCreateArgs>({
  bookSerie: {
    one: {
      data: {
        idCode: 'String327505',
        title: 'String',
        updatedAt: '2022-09-02T10:46:12Z',
      },
    },
    two: {
      data: {
        idCode: 'String1937763',
        title: 'String',
        updatedAt: '2022-09-02T10:46:12Z',
      },
    },
  },
});

export type StandardScenario = typeof standard;
