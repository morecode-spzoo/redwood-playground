import {
  bookAuthors,
  bookAuthor,
  createBookAuthor,
  updateBookAuthor,
  deleteBookAuthor,
} from './bookAuthors';
import type { StandardScenario } from './bookAuthors.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('bookAuthors', () => {
  scenario('returns all bookAuthors', async (scenario: StandardScenario) => {
    const result = await bookAuthors();

    expect(result.length).toEqual(Object.keys(scenario.bookAuthor).length);
  });

  scenario(
    'returns a single bookAuthor',
    async (scenario: StandardScenario) => {
      const result = await bookAuthor({ id: scenario.bookAuthor.one.id });

      expect(result).toEqual(scenario.bookAuthor.one);
    }
  );

  scenario('creates a bookAuthor', async (scenario: StandardScenario) => {
    const result = await createBookAuthor({
      input: {
        updatedAt: '2022-09-02T08:38:07Z',
        authorId: scenario.bookAuthor.two.authorId,
        bookId: scenario.bookAuthor.two.bookId,
      },
    });

    expect(result.updatedAt).toEqual('2022-09-02T08:38:07Z');
    expect(result.authorId).toEqual(scenario.bookAuthor.two.authorId);
    expect(result.bookId).toEqual(scenario.bookAuthor.two.bookId);
  });

  scenario('updates a bookAuthor', async (scenario: StandardScenario) => {
    const original = await bookAuthor({ id: scenario.bookAuthor.one.id });
    const result = await updateBookAuthor({
      id: original.id,
      input: { updatedAt: '2022-09-03T08:38:07Z' },
    });

    expect(result.updatedAt).toEqual('2022-09-03T08:38:07Z');
  });

  scenario('deletes a bookAuthor', async (scenario: StandardScenario) => {
    const original = await deleteBookAuthor({ id: scenario.bookAuthor.one.id });
    const result = await bookAuthor({ id: original.id });

    expect(result).toEqual(null);
  });
});
