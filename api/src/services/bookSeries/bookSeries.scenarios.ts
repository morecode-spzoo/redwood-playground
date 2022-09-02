import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.BookSerieCreateArgs>({
  bookSerie: {
    one: {
      data: {
        idCode: 'String9441100',
        title: 'String',
        updatedAt: '2022-09-02T09:30:05Z',
      },
    },
    two: {
      data: {
        idCode: 'String9481405',
        title: 'String',
        updatedAt: '2022-09-02T09:30:05Z',
      },
    },
  },
});

export type StandardScenario = typeof standard;
