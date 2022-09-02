import {
  bookSeries,
  bookSerie,
  createBookSerie,
  updateBookSerie,
  deleteBookSerie,
} from './bookSeries';
import type { StandardScenario } from './bookSeries.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('bookSeries', () => {
  scenario('returns all bookSeries', async (scenario: StandardScenario) => {
    const result = await bookSeries();

    expect(result.length).toEqual(Object.keys(scenario.bookSerie).length);
  });

  scenario('returns a single bookSerie', async (scenario: StandardScenario) => {
    const result = await bookSerie({ id: scenario.bookSerie.one.id });

    expect(result).toEqual(scenario.bookSerie.one);
  });

  scenario('creates a bookSerie', async () => {
    const result = await createBookSerie({
      input: {
        idCode: 'String6413050',
        title: 'String',
        updatedAt: '2022-09-02T10:46:12Z',
      },
    });

    expect(result.idCode).toEqual('String6413050');
    expect(result.title).toEqual('String');
    expect(result.updatedAt).toEqual('2022-09-02T10:46:12Z');
  });

  scenario('updates a bookSerie', async (scenario: StandardScenario) => {
    const original = await bookSerie({ id: scenario.bookSerie.one.id });
    const result = await updateBookSerie({
      id: original.id,
      input: { idCode: 'String10555862' },
    });

    expect(result.idCode).toEqual('String10555862');
  });

  scenario('deletes a bookSerie', async (scenario: StandardScenario) => {
    const original = await deleteBookSerie({ id: scenario.bookSerie.one.id });
    const result = await bookSerie({ id: original.id });

    expect(result).toEqual(null);
  });
});
