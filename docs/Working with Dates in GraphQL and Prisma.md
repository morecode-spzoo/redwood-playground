---
title: Working with Date (and DateTime) with Prisma and GraphQL
author: Sebastian Pieczyński
date: 2022.09.07
lastModifiedDate: 2022.09.07
---

# How to work with Date / DateTime in Prisma and GraphQL

Working with dates (and time especially) is hard. Prisma with GraphQL layer make that somewhat easier.

The most common use case for ths project will be working with days where we do not really concern ourselves with time portion.

The following shows how to achive exactly that.

## Specifying date without time or timezone

### Database side

In database schema file you need at least one filed with `DateTime` type.
Luckily we have such field in `BookRelease` model called `releaseDate`.

```js
model BookRelease {
  id String    @id      @default(cuid())
  releaseDate  DateTime @default(now())
  ...
}
```

We care only about the day the boook was released on, so we will want to skip the time when querying data.
Sadly in our seed file we must specify full date in `DateTime` format since this is what Prisma expects.
On the bright side seeded data will be perfect for testing later on, and for potencial users there will be no negative impact.

Exerpt from seed file:
```js
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
```

The crucial part is the GraphQL side. Our `releaseManager.sdl.ts` would normally look like this:

```js
export const schema = gql`
  type Query {
    #prettier-ignore
    findReleasesBetween(startDate: DateTime, endDate: DateTime): [BookRelease] @requireAuth
  }
`;
```

to stay compliant with the underlying `releaseDate` data type but this on the other hand forces us to build our queries with time portion filled in.

```js
query {
  findReleasesBetween(startDate: "2000-01-01T00:00:00.000Z", endDate:"2014-01-01T00:00:00.000Z") {
    id
  }
}
```

Thankfully we can use GraphQL's built in `Date` type that ommits the time part and is automatically converted to accepted DateTime format.

Our Query will then look like this:

```js
export const schema = gql`
  type Query {
    #prettier-ignore
    findReleasesBetween(startDate: Date, endDate: Date): [BookRelease] @requireAuth
  }
```
Notice that parameters are now of `Date` type instead of `DateTime` type.
Now we can write more readable and easier queries:

```js
query {
  findReleasesBetween(startDate: "2000-01", endDate:"2014-01") {
    id
  }
}
```

Full query example:

```js
query {
  findReleasesBetween(startDate: "2010-01-01", endDate:"2014-01-01") {
    id
    releaseTitle
    releaseDate
    publisher
    book {
      title
      series {
        title
      }
    }
  }
}
```

will return correct number of results:

```json
{
  "data": {
    "findReleasesBetween": [
      {
        "id": "cl7rkq5xy01382grcruvxynny",
        "releaseTitle": null,
        "releaseDate": "2010-08-31T00:00:00.000Z",
        "publisher": "Tor Books",
        "book": {
          "title": "The Way of Kings",
          "series": {
            "title": "Stormlight Archive"
          }
        }
      },
      {
        "id": "cl7rkq5y901562grco8xysg9d",
        "releaseTitle": null,
        "releaseDate": "2013-01-08T00:00:00.000Z",
        "publisher": "Tor Books",
        "book": {
          "title": "A Memory of Light",
          "series": {
            "title": "Wheel of Time"
          }
        }
      }
    ]
  }
}
```

So in review all we had to do is to change parameter types for GraphQL query from `DateTime` to `Date` to make it working.
