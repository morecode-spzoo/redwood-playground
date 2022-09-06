# README

This repo was created to reproduce issue mentioned in:
https://community.redwoodjs.com/t/integrate-custom-select-react-select-or-other-as-custom-redwood-component/3894/2

**All issues are annotated with `FIXME:` comments.**

Comments were added to explain what happens and what is expected.

## Documentation - Lessons Learned

All fixed issues are documented in the `docs` folder.

See `.md` files in `[root]/docs/` to learn how to implement some of basic functionality in RedwoodJS not directly covered by tutorial series.

1. [Introduction on how to create Queries and Mutations](/docs/Creating-Queries-and-Mutations.md)
2. [How to work with related data in custom components](/docs/Working%20with%20relational%20data%20in%20Forms.md)

## Tags

Repo is tagged with:

`react-select-component`: Example of using React-Select to manage relation between data (multiple choice selection)
`native-multi-select`: Example of using native select component with multiple option
'SERVICE_NOT_IMPLEMENTED': Example of error when SDL is defined in separate file as well as service implementation is also implemented separately in custom file

## Issue description and reproduction:

### Select component

Seems that using `Controller` component and not passing `controller` prop fixes issue with connection to Redwood forms.
It seems this is mainly GraphQL problem at this stage.
See below:

- Problem happens with BookSeries
  - when editing a single series that books belong to it is not possible to save changes
  - saving without changes will work as no books are being sent
  - depending on how onChange is implemented either full `[Book]` object array is sent or just array of IDs
  - with array of IDs app breaks or select ends up with X fields with no titles and no IDs to loop over

### SERVICE_NOT_IMPLEMENTED

This happens in `api\src\graphql\custom\usersCustom.sdl.ts` only if service is implemented OUTSIDE of standard generated file (as is in this case).
See file: `api\src\services\custom\usersCustom.ts` - there is an implementation of `seekUsersBy` query but SDL will raise an error `SERVICE_NOT_IMPLEMENTED`.

### Unreproducible issues

#### Types not updating for graphql.d.ts

Issue reported at Redwood Forums: [Separate generated services and SDL files from custom ones](https://community.redwoodjs.com/t/separate-generated-services-and-sdl-files-from-custom-ones/3896/8)
I could reproduce issue with the `SERVICE_NOT_DEFINED` (not mentined above), but not the one with types not generating without command, may be related to minor Redwood version bump, but changelog does not indicate any issue related to that behavior.

#### GraphQL queries not updating types

Seems to be related to the one above.

There ~is~ **was** a problem with `EditBookSerieById` mutation as it reports that `book` cannot be queried (but it queries it nevertheless) and generating types or new prisma client does not help, rebooting PC over the weekend fixed the issue. Running Windows 10 PC.

# Installation

Uses SQLite for DB.

1. Clone this repo and run `yarn install`
2. run `yarn rw prisma migrate reset --force` to recreate the DB.
3. run `yarn rw dev`
4. In the broser go to: [Book Series Admin Page](http://localhost:8910/admin/book-series)
5. Try to add new book to existing series
6. To see that standard select works (other side of relation) go to: [Books Admin Page](http://localhost:8910/admin/books)


# System info

Results of: `yarn rw info`

```
System:
    OS: Windows 10 10.0.19044
  Binaries:
    Node: 16.13.1 - C:\Users\SEBAST~1\AppData\Local\Temp\xfs-a74c0866\node.CMD
    Yarn: 3.2.1 - C:\Users\SEBAST~1\AppData\Local\Temp\xfs-a74c0866\yarn.CMD
  Browsers:
    Chrome: 105.0.5195.53
    Edge: Spartan (44.19041.1266.0), Chromium (105.0.1343.27)
  npmPackages:
    @redwoodjs/core: 2.2.3 => 2.2.3
```


