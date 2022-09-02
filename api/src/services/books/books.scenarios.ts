import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.BookCreateArgs>({
  book: {
    one: {
      data: {
        idCode: 'String3461979',
        title: 'String',
        updatedAt: '2022-09-02T09:29:38Z',
        series: {
          create: {
            idCode: 'String1726628',
            title: 'String',
            updatedAt: '2022-09-02T09:29:38Z',
          },
        },
      },
    },
    two: {
      data: {
        idCode: 'String4679117',
        title: 'String',
        updatedAt: '2022-09-02T09:29:38Z',
        series: {
          create: {
            idCode: 'String356177',
            title: 'String',
            updatedAt: '2022-09-02T09:29:38Z',
          },
        },
      },
    },
  },
});

export type StandardScenario = typeof standard;
