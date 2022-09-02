export const bookReleasesDataSeed = [
  {
    releaseDate: '2010-08-31T00:00:00.000Z',
    publisher: 'Tor Books',
    country: 'USA',
    language: 'American English',
    book: {
      connect: {
        idCode: 'stormlight_001',
      },
    },
  },
  {
    releaseDate: '2014-04-30T00:00:00.000Z',
    releaseTitle: 'Droga Królów',
    coverType: 'paperback',
    publisher: 'MAG',
    country: 'PL',
    language: 'Polish',
    book: {
      connect: {
        idCode: 'stormlight_001',
      },
    },
  },
  {
    releaseDate: '2013-01-08T00:00:00.000Z',
    publisher: 'Tor Books',
    country: 'USA',
    language: 'American English',
    book: {
      connect: {
        idCode: 'wheel_of_time_014',
      },
    },
  },
  {
    releaseDate: '2016-01-01T00:00:00.000Z',
    releaseTitle: 'Pamięć Światłości',
    publisher: 'Zysk i S-ka',
    country: 'PL',
    language: 'Polish',
    book: {
      connect: {
        idCode: 'wheel_of_time_014',
      },
    },
  },
]
