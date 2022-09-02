import {
  authors,
  author,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from './authors'
import type { StandardScenario } from './authors.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('authors', () => {
  scenario('returns all authors', async (scenario: StandardScenario) => {
    const result = await authors()

    expect(result.length).toEqual(Object.keys(scenario.author).length)
  })

  scenario('returns a single author', async (scenario: StandardScenario) => {
    const result = await author({ id: scenario.author.one.id })

    expect(result).toEqual(scenario.author.one)
  })

  scenario('creates a author', async () => {
    const result = await createAuthor({
      input: {
        idCode: 'String2819175',
        firstName: 'String',
        lastName: 'String',
        updatedAt: '2022-09-02T08:38:23Z',
      },
    })

    expect(result.idCode).toEqual('String2819175')
    expect(result.firstName).toEqual('String')
    expect(result.lastName).toEqual('String')
    expect(result.updatedAt).toEqual('2022-09-02T08:38:23Z')
  })

  scenario('updates a author', async (scenario: StandardScenario) => {
    const original = await author({ id: scenario.author.one.id })
    const result = await updateAuthor({
      id: original.id,
      input: { idCode: 'String24896612' },
    })

    expect(result.idCode).toEqual('String24896612')
  })

  scenario('deletes a author', async (scenario: StandardScenario) => {
    const original = await deleteAuthor({ id: scenario.author.one.id })
    const result = await author({ id: original.id })

    expect(result).toEqual(null)
  })
})
