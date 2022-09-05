# How to create custom Queries and Mutations in RedwoodJS

## Create SDL files

Place SDL files in `[root]/api/graphql/[subdirectory]/[fileName].sdl.ts`


### Custom Type Example

Exports *input type* so it can be reused as special input for mutations. It will be available in generated `graphql.d.ts` file.

`/api/graphql/custom/bookCustom.sdl.(ts|js)`:

```js
export const schema = gql`
  input BookInput {
    id: String!
  }
`;
```
### Query Example

`\api\graphql\custom\usersCustom.sdl.ts`:

```js
export const schema = gql`
  type Query {
    seekUsersBy(firstName: String): [User]! @requireAuth
  }
`;
```

### Mutaiton Example

`\api\graphql\custom\serieCustom.sdl.ts`:

```js
export const schema = gql`
  type Mutation {
    #prettier-ignore
    updateSerieAddBooks(serieId: String!, books: [BookInput!]!): BookSerie @requireAuth
    #prettier-ignore
    updateSerieSetBooks(serieId: String!, books: [BookInput!]!): BookSerie @requireAuth
    #prettier-ignore
    updateSerieRemoveBooks(serieId: String!, books: [BookInput!]!): BookSerie @requireAuth
  }
`;
```


## Define Services

### Custom Query Service

Service files are located in:

`[root]/api/services/[subfolder]/[fileName].(ts|js)`

To type the resolver properly import `QueryResolvers` from `types/graphql` and use the name of the function as property for the `QueryResolvers`.
That way function arguments will be checked by Typescript.

Data is retreived by Prisma (instantiated as `db` in RedwoodJS). Use `db` from `import { db } from 'src/lib/db';` to retrieve correct data.

`/api/src/services/custom/usersCustom.ts`:

```js
import type { QueryResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const seekUsersBy: QueryResolvers['seekUsersBy'] = ({ firstName }) => {
  return db.user.findMany({
    where: {
      firstName: {
        contains: firstName,
        // mode: 'insensitive', //required only for PostgreSQL, for SQLite it's default behaviour
      },
    },
  });
};
```

### Custom Mutation Service

`Mutations` are similar to `Queries` but instead of retrieving data they change (or mutate) it.

`/api/src/services/custom/serieCustom.ts`:
```js
export const updateSerieAddBooks: MutationResolvers['updateSerieAddBooks'] = ({
  serieId,
  books,
}) => {
  console.log('Updating series: ', serieId);
  console.log(
    'Adding books: ',
    books.map((book) => book.id)
  );

  return db.bookSerie.update({
    where: {
      id: serieId,
    },
    data: {
      books: {
        connect: books, // to remove use disconnect() // to change all use set() see the
      },
    },
  });
};

...
export const updateSerieSetBooks(...) {
  ...
}

export const updateSerieRemoveBooks(...) {
  ...
}
...
```
# IMPORTANT!

If you have changed the fields in the schema ex. from required to optional (by adding or removing `?`) then remember to change the correct SDL file or regenerate it manually.
ex. if `Book` model was change to allow `bookSerie` field be null and SDL file was not changed it would invoke an error:

```
Error: Cannot return null for non-nullable field Book.series
```

To fix the error open `books.sdl.ts` and change:

```js
export const schema = gql`
  type Book {
    id: String!
    idCode: String!
    title: String!
    series: BookSerie!
    authors: [BookAuthor]!
    releases: [BookRelease]!
    createdAt: DateTime!
    updatedAt: DateTime!
    bookSerieId: String!
  }
  ...
  ```

to:

```js
export const schema = gql`
  type Book {
    id: String!
    idCode: String!
    title: String!
    series: BookSerie // <- notice the lack of ! now the series field is ALLOWED to return NULL as a value of the Book object
    authors: [BookAuthor]!
    releases: [BookRelease]!
    createdAt: DateTime!
    updatedAt: DateTime!
    bookSerieId: String!
  }
...
```

# Mutating data with GraphQL

You can use any client to query GraphQL API ex. Altair or RedwoodJS own GraphQL Playground

Adding Books to series - this will add book to the series without affecting other Books assigned to the series already:

```
mutation updateSeriesAddBooks($seriesId: String!, $books: [BookInput!]!) {
  updateSerieAddBooks(serieId: $seriesId, books: $books) {
    id
    title
    books {
      title
    }
  }

}
```

as variables set:

This is just an example. Change the ID values as these will be different on every DB seed run.

```
{
  "seriesId": "cl7ol71wy0014ycrclalbf2ir",
  "books": [{"id": "cl7ol71y10055ycrc7x8mgbrx"}]
}
```

This mutation will remove the same book from the series:

```
mutation updateSeriesRemoveBooks($seriesId: String!, $books: [BookInput!]!) {
  updateSerieRemoveBooks(serieId: $seriesId, books: $books) {
    id
    title
    books {
      title
    }
  }

}
```

Same as above, just an example. Change the ID values as these will be different on every DB seed run.

```
{
  "seriesId": "cl7ol71wy0014ycrclalbf2ir",
  "books": [{"id": "cl7ol71y10055ycrc7x8mgbrx"}]
}
```
