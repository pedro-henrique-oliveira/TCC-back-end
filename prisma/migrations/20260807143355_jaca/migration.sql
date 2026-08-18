/*
  Warnings:

  - You are about to drop the column `alunoId` on the `Funcionarios` table. All the data in the column will be lost.
  - Added the required column `funcionarioId` to the `alunos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Funcionarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "adm" BOOLEAN NOT NULL DEFAULT false,
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
INSERT INTO "new_Funcionarios" ("adm", "cargo", "clt", "cpf", "createdAt", "dataNascimento", "email", "id", "idade", "nome", "senha", "turno", "updatedAt") SELECT "adm", "cargo", "clt", "cpf", "createdAt", "dataNascimento", "email", "id", "idade", "nome", "senha", "turno", "updatedAt" FROM "Funcionarios";
DROP TABLE "Funcionarios";
ALTER TABLE "new_Funcionarios" RENAME TO "Funcionarios";
CREATE TABLE "new_alunos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "idade" INTEGER,
    "dataNascimento" DATETIME,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "plano" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "funcionarioId" INTEGER NOT NULL,
    CONSTRAINT "alunos_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_alunos" ("cpf", "createdAt", "dataNascimento", "email", "id", "idade", "nome", "plano", "updatedAt") SELECT "cpf", "createdAt", "dataNascimento", "email", "id", "idade", "nome", "plano", "updatedAt" FROM "alunos";
DROP TABLE "alunos";
ALTER TABLE "new_alunos" RENAME TO "alunos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
