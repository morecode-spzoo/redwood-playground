import {
  bookReleases,
  bookRelease,
  createBookRelease,
  updateBookRelease,
  deleteBookRelease,
} from './bookReleases'
import type { StandardScenario } from './bookReleases.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('bookReleases', () => {
  scenario('returns all bookReleases', async (scenario: StandardScenario) => {
    const result = await bookReleases()

    expect(result.length).toEqual(Object.keys(scenario.bookRelease).length)
  })

  scenario(
    'returns a single bookRelease',
    async (scenario: StandardScenario) => {
      const result = await bookRelease({ id: scenario.bookRelease.one.id })

      expect(result).toEqual(scenario.bookRelease.one)
    }
  )

  scenario('creates a bookRelease', async () => {
    const result = await createBookRelease({
      input: { publisher: 'String', updatedAt: '2022-09-02T08:38:37Z' },
    })

    expect(result.publisher).toEqual('String')
    expect(result.updatedAt).toEqual('2022-09-02T08:38:37Z')
  })

  scenario('updates a bookRelease', async (scenario: StandardScenario) => {
    const original = await bookRelease({ id: scenario.bookRelease.one.id })
    const result = await updateBookRelease({
      id: original.id,
      input: { publisher: 'String2' },
    })

    expect(result.publisher).toEqual('String2')
  })

  scenario('deletes a bookRelease', async (scenario: StandardScenario) => {
    const original = await deleteBookRelease({
      id: scenario.bookRelease.one.id,
    })
    const result = await bookRelease({ id: original.id })

    expect(result).toEqual(null)
  })
})
