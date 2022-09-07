import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.AuthorCreateArgs>({
  author: {
    one: {
      data: {
        idCode: 'String9600954',
        firstName: 'String',
        lastName: 'String',
        updatedAt: '2022-09-02T08:38:23Z',
      },
    },
    two: {
      data: {
        idCode: 'String3151975',
        firstName: 'String',
        lastName: 'String',
        updatedAt: '2022-09-02T08:38:23Z',
      },
    },
  },
});

export type StandardScenario = typeof standard;
