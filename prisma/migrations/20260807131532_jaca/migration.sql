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
INSERT INTO "new_Funcionarios" ("cargo", "clt", "cpf", "createdAt", "dataNascimento", "email", "id", "idade", "nome", "senha", "turno", "updatedAt") SELECT "cargo", "clt", "cpf", "createdAt", "dataNascimento", "email", "id", "idade", "nome", "senha", "turno", "updatedAt" FROM "Funcionarios";
DROP TABLE "Funcionarios";
ALTER TABLE "new_Funcionarios" RENAME TO "Funcionarios";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
