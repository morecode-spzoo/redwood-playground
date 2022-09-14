---
title: Working with relational data in GraphQL API side in RedwoodJS
author: Sebastian Pieczyński
date: 2022.09.06
lastModified: 2022.09.06
---

# Working with relational data in RedwoodJS Forms

While scaffolds provide a great way to start you will soon find that having no easy way to connect data between models is problematic.
This document describes how to create forms with select field that allows to display the data that is related to currently edited table.

There are multiple steps involved and I'll list them here briefly and then we will learn how to implement it in our project.

1. Create an input that will be compatibile with data that you expect to send from the **form** to API side.
2. Modify the `Update...Input` input type to accept the related field data.
3. Modify `Edit...Cell` to fetch data for select component.
4. Modify `Edit...Cell` to update data.
5. Modify `Edit...Cell` to strip fetched data of `__typename` added by Apollo Server for query caching purposes.
6.


In this project we are adding connection between `Books` and `Serie` on the series side since that one will hold references to many books.

Create a file `bookManager.sdl.ts` in `[root]/api/src/graphql/`

```js
export const schema = gql`
  # be aware that one of the unique fields MUST be provided
  input BookInput {
    id: String! # - this is the safest way to declare the type but if there is at least one unique field present it will work as well
    # id: String #unique field,  since there are 2 unique fields it will work with either one but having id required is prefferable
    idCode: String #unique field
    title: String
  }
`;
```

Now we can add `books` field to the `UpdateBookSerieInput` from `bookSeries.sdl.ts` this will make sure that we expect this data to be sent from the form. Please move the input to the manager file.

> **IMPORTANT!**
> Cut and paste this Input into the `...Manager.sdl.ts` file as any forced recreation will destroy it!

```js
  input UpdateBookSerieInput {
    idCode: String
    title: String
    books: [BookInput] # this is what the Form expects to send to save the data, field is optional
  }
```

Then create or edit the `api/src/graphql/serieManager.sdl.ts` file and add new Mutation that will be responsible for updating the Serie model with Book relations:

```js
export const schema = gql`
  type Mutation {
    #prettier-ignore - because the @requireAuth may be moved to another line and we do not want this to happen
    updateSerieSetBooks(serieId: String!, serieData: UpdateBookSerieInput,  books: [BookInput]): BookSerie @requireAuth
  }
`;
```

Afterwards edit the `EditBookSerieCell.tsx` in `web` side and modify the `query` to fetch all books:

```js
query EditBookSerieById($id: String!) {
    bookSerie: bookSerie(id: $id) {
      id
      idCode
      title
      books {
        id
        title
      }
      createdAt
      updatedAt
    }
    # this part invokes additional query to get all the books and pass the data into the form - if any field that is required is missing form will not submit
    books {
      id # only one unique field is required to submit data properly, ID is safest bet always
      idCode
      title
    }
  }
`;
```

Create or modify a mutation for update action, notice that as input we are using the **modified** `UpdateBookSerieInput`:

```js
const UPDATE_BOOK_SERIE_MUTATION = gql`
  mutation updateSerieSetBooks($id: String!, $input: UpdateBookSerieInput) {
    # this is a mutation that will be run from server side
    updateSerieSetBooks(serieId: $id, serieData: $input) {
      id
      idCode
      title
      books {
        id
        title
      }
      createdAt
      updatedAt
    }
  }
`;
```

Now one of the most important and unintuitive parts. Apollo server adds `__typename` to the query results for caching purposes and that data is also part of our input. Our `Update...` will not accept it and we cannot add `__typename` to the type itself as it's reserved keyword. The only way I did find is to remove this property from the object with `removeTypenamePropertyFromObject` - it is a custom function created in `[root]/web/src/utils` folder.

```js
const onSave = (input, id) => {
    // this is a must for mutation it will not work without removing __typename and you cannot add __ANYname to type as it's reserved keyword
    input.books = removeTypenamePropertyFromObject(input.books);

    updateSerieSetBooks({
      variables: {
        id,
        input: input,
      },
    });
  };
```

With that our data is ready to be processed and saved.

At this point the WEB side is ready and we need to modify the API side that will allow us to modify both `Serie` data as well as it's relation to `Book`s.

In `services/serieManager.ts`:

```js
export const updateSerieSetBooks: MutationResolvers['updateSerieSetBooks'] = ({
  serieId,
  serieData,
}) => {
  return db.bookSerie.update({
    where: {
      id: serieId,
    },
    data: {
      ...serieData,
      books: {
        set: serieData?.books?.map((book) => {
          return { id: book?.id };
        }),
      },
    },
  });
};
```

Note that here we `set` the books relationship overwriting any existing references. This can happen since our select component has `defaultValue` set to values that were fetched with bookSeries query.
The other important part is that we need to return an object with at least one unique field, this is why we return the array of objects with id of the book we want set for relation.

We cannot return only ID values as our API will not be able to understand it.

```js
set: serieData?.books?.map((book) => {
          return { id: book?.id };
        }),
```

Mutation to run will now look like:

```gql
mutation updateSeriesSetBooks($serieId: String!, $serieData: UpdateBookSerieInput) {
  updateSerieSetBooks(serieId: $serieId, serieData: $serieData) { # <- change this mutation name to custom mutation
    id
    idCode
    title
    books {
      title
    }
  }
}
```
And variables submitted with the mutation should be set as following (IDs should be changed as they will be different on every seed run):

```gql
{
  "serieId": "cl7ol71wy0014ycrclalbf2ir",
  "serieData": {
  "books": [{"id": "cl7ol71y10055ycrc7x8mgbrx"},{"id": "cl7ol71xf0028ycrc1xvdyqzc"},{"id": "cl7ol71xm0037ycrc4xebuhl6"}, {"id": "cl7ol71xu0046ycrcbcsrwuxi"}]
  }
}
```

The example above shows only how to SET books but there is nothing stopping us from changing the title of the series within the same query:

```gql
{
  "serieId": "cl7ol71wy0014ycrclalbf2ir",
  "serieData": {
    "title": "Stormlight Archive",
  	"books": [{"id": "cl7ol71y10055ycrc7x8mgbrx"},{"id": "cl7ol71xf0028ycrc1xvdyqzc"},{"id": "cl7ol71xm0037ycrc4xebuhl6"}, {"id": "cl7ol71xu0046ycrcbcsrwuxi"}]
  }
}
```

> If it does not work please change the IDs
