-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "bookSerieId" TEXT,
    CONSTRAINT "Book_bookSerieId_fkey" FOREIGN KEY ("bookSerieId") REFERENCES "BookSerie" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("bookSerieId", "createdAt", "id", "idCode", "title", "updatedAt") SELECT "bookSerieId", "createdAt", "id", "idCode", "title", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE UNIQUE INDEX "Book_idCode_key" ON "Book"("idCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
