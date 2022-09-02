import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.BookReleaseCreateArgs>({
  bookRelease: {
    one: { data: { publisher: 'String', updatedAt: '2022-09-02T08:38:37Z' } },
    two: { data: { publisher: 'String', updatedAt: '2022-09-02T08:38:37Z' } },
  },
})

export type StandardScenario = typeof standard
