import { db } from 'api/src/lib/db'

import { authorDataSeed } from './seed-data/authorDataSeed'
import { bookAuthorsDataSeed } from './seed-data/bookAuthorsDataSeed'
import { bookDataSeed } from './seed-data/bookDataSeed'
import { bookReleasesDataSeed } from './seed-data/bookReleasesDataSeed'

export default async () => {
  enum debugLevel {
    off = 0,
    basic = 1,
    info = debugLevel.basic + 1,
    rowEntries = debugLevel.info + 1,
    notification = debugLevel.rowEntries + 1,
    issue = debugLevel.notification + 1,
    error = debugLevel.issue + 1,
    fatal = debugLevel.error + 1,
    default = 1,
  }

  const seedTable = async (
    seedEntityDisplayName,
    seedData,
    seeder,
    debug = debugLevel.basic
  ) => {
    if (debug >= debugLevel.basic) {
      console.debug(`-------------------------------------------------`)
      console.debug(`Start: Seeding table with ${seedEntityDisplayName}`)
    }

    if (debug >= debugLevel.rowEntries) {
      console.debug(`${seedEntityDisplayName}: `, seedData)
    }

    for (const item of seedData) {
      if (debug >= debugLevel.rowEntries) {
        console.debug('Adding item: ', item)
      }

      try {
        await seeder.create({
          data: item,
        })
      } catch (e) {
        console.error(`Error while seeding ${seedEntityDisplayName}: `, e)
      }
    }
    if (debug >= debugLevel.basic) {
      console.debug(`DONE: Seeding table with ${seedEntityDisplayName}`)
    }
  }

  const updateTable = async (
    updateEntityDisplayName,
    updateData,
    updater,
    debug = debugLevel.basic
  ) => {
    if (debug >= debugLevel.basic) {
      console.debug(`-------------------------------------------------`)
      console.debug(`Start: Updating table with ${updateEntityDisplayName}`)
    }

    if (debug >= debugLevel.rowEntries) {
      console.debug(`${updateEntityDisplayName}: `, updateData)
    }

    for (const item of updateData) {
      if (debug >= debugLevel.rowEntries) {
        console.debug('Updating item: ', item)
      }

      try {
        await updater.update(item)
      } catch (e) {
        console.error(`Error while updating ${updateEntityDisplayName}: `, e)
      }
    }
    if (debug >= debugLevel.basic) {
      console.debug(`DONE: Updating table with ${updateEntityDisplayName}`)
    }
  }

  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //
    // const data: Prisma.UserExampleCreateArgs['data'][] = [
    // To try this example data with the UserExample model in schema.prisma,
    // uncomment the lines below and run 'yarn rw prisma migrate dev'
    //
    // { name: 'alice', email: 'alice@example.com' },
    // { name: 'mark', email: 'mark@example.com' },
    // { name: 'jackie', email: 'jackie@example.com' },
    // { name: 'bob', email: 'bob@example.com' },
    // ]
    console.log(
      "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    )

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    await seedTable('Authors', authorDataSeed, db.author)
    await seedTable('Books', bookDataSeed, db.book)
    await seedTable('Book Authors', bookAuthorsDataSeed, db.bookAuthor)
    await seedTable('Book Releases', bookReleasesDataSeed, db.bookRelease)
    //
    // Change to match your data model and seeding needs
    //
    // data.map(async (data: Prisma.UserExampleCreateArgs['data']) => {
    //   const record = await db.userExample.create({ data })
    //   console.log(record)
    // })
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
