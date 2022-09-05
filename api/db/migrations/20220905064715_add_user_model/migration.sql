-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "middleNames" TEXT,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" DATETIME,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
