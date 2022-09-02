import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.BookAuthorCreateArgs>({
  bookAuthor: {
    one: {
      data: {
        updatedAt: '2022-09-02T08:38:07Z',
        author: {
          create: {
            idCode: 'String514978',
            firstName: 'String',
            lastName: 'String',
            updatedAt: '2022-09-02T08:38:07Z',
          },
        },
        book: {
          create: {
            idCode: 'String2516127',
            title: 'String',
            updatedAt: '2022-09-02T08:38:07Z',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2022-09-02T08:38:07Z',
        author: {
          create: {
            idCode: 'String3972445',
            firstName: 'String',
            lastName: 'String',
            updatedAt: '2022-09-02T08:38:07Z',
          },
        },
        book: {
          create: {
            idCode: 'String9408824',
            title: 'String',
            updatedAt: '2022-09-02T08:38:07Z',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
