/*
  Warnings:

  - You are about to drop the `funcionarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "funcionarios";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Funcionarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "idade" INTEGER,
    "dataNascimento" DATETIME,
    "cpf" TEXT NOT NULL,
    "clt" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
