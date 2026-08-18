/*
  Warnings:

  - You are about to drop the `_AlunosToinstrutores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `instrutores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to alter the column `idade` on the `Alunos` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- DropIndex
DROP INDEX "_AlunosToinstrutores_B_index";

-- DropIndex
DROP INDEX "_AlunosToinstrutores_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AlunosToinstrutores";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "instrutores";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "funcionarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "idade" INTEGER,
    "dataNascimento" DATETIME,
    "cpf" TEXT NOT NULL,
    "clt" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "receita" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pagamento" TEXT NOT NULL,
    "dataPagamento" DATETIME NOT NULL,
    "valorPagamento" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "formaPagamento" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alunos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "idade" INTEGER,
    "dataNascimento" DATETIME,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "plano" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Alunos" ("cpf", "createdAt", "dataNascimento", "email", "id", "idade", "nome", "plano", "updatedAt") SELECT "cpf", "createdAt", "dataNascimento", "email", "id", "idade", "nome", "plano", "updatedAt" FROM "Alunos";
DROP TABLE "Alunos";
ALTER TABLE "new_Alunos" RENAME TO "Alunos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
