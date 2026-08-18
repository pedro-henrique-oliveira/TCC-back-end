-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "funcionarioId" INTEGER,
    CONSTRAINT "alunos_funcionarioId_fkey" FOREIGN KEY ("funcionarioId") REFERENCES "Funcionarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_alunos" ("cpf", "createdAt", "dataNascimento", "email", "funcionarioId", "id", "idade", "nome", "plano", "updatedAt") SELECT "cpf", "createdAt", "dataNascimento", "email", "funcionarioId", "id", "idade", "nome", "plano", "updatedAt" FROM "alunos";
DROP TABLE "alunos";
ALTER TABLE "new_alunos" RENAME TO "alunos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
