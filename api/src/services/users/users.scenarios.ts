import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        firstName: 'String',
        lastName: 'String',
        email: 'String',
        password: 'String',
      },
    },
    two: {
      data: {
        firstName: 'String',
        lastName: 'String',
        email: 'String',
        password: 'String',
      },
    },
  },
});

export type StandardScenario = typeof standard;
