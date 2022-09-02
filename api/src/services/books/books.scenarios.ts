import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.BookCreateArgs>({
  book: {
    one: {
      data: {
        idCode: 'String4913237',
        title: 'String',
        updatedAt: '2022-09-02T10:29:58Z',
        series: {
          create: {
            idCode: 'String5505560',
            title: 'String',
            updatedAt: '2022-09-02T10:29:58Z',
          },
        },
      },
    },
    two: {
      data: {
        idCode: 'String8707656',
        title: 'String',
        updatedAt: '2022-09-02T10:29:58Z',
        series: {
          create: {
            idCode: 'String3175785',
            title: 'String',
            updatedAt: '2022-09-02T10:29:58Z',
          },
        },
      },
    },
  },
});

export type StandardScenario = typeof standard;
