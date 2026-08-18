/*
  Warnings:

  - Added the required column `alunoId` to the `Funcionarios` table without a default value. This is not possible if the table is not empty.

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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alunoId" INTEGER NOT NULL,
    CONSTRAINT "Funcionarios_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "alunos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Funcionarios" ("adm", "cargo", "clt", "cpf", "createdAt", "dataNascimento", "email", "id", "idade", "nome", "senha", "turno", "updatedAt") SELECT "adm", "cargo", "clt", "cpf", "createdAt", "dataNascimento", "email", "id", "idade", "nome", "senha", "turno", "updatedAt" FROM "Funcionarios";
DROP TABLE "Funcionarios";
ALTER TABLE "new_Funcionarios" RENAME TO "Funcionarios";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
