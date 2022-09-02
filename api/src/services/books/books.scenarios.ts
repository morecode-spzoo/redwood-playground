import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.BookCreateArgs>({
  book: {
    one: {
      data: {
        idCode: 'String8339848',
        title: 'String',
        updatedAt: '2022-09-02T08:37:51Z',
      },
    },
    two: {
      data: {
        idCode: 'String7857161',
        title: 'String',
        updatedAt: '2022-09-02T08:37:51Z',
      },
    },
  },
})

export type StandardScenario = typeof standard
