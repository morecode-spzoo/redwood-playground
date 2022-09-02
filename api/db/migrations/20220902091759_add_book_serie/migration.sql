/*
  Warnings:

  - You are about to drop the column `series` on the `Book` table. All the data in the column will be lost.
  - Added the required column `bookSerieId` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "BookSerie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "bookSerieId" TEXT NOT NULL,
    CONSTRAINT "Book_bookSerieId_fkey" FOREIGN KEY ("bookSerieId") REFERENCES "BookSerie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("createdAt", "id", "idCode", "title", "updatedAt") SELECT "createdAt", "id", "idCode", "title", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_idCode_key" ON "Book"("idCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "BookSerie_idCode_key" ON "BookSerie"("idCode");
