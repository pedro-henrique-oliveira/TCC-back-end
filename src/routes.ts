import { Router, type Request, type Response } from "express";
import AlunoAcademia from "./controllers/AlunoAcademia.js";
import Funcionarios from "./controllers/funcionarios.js";
import receita from "./controllers/receita.js";
import treino from "./controllers/treinos.js";
import despesas from "./controllers/despesas.js";
import presencas from "./controllers/presencas.js";
import { authentication } from "./middlewares/authentication.js";
import auth from "./controllers/auth.js";
import planoController from "./controllers/planoController.js";

const routes = Router();

routes.get("/", (_request: Request, response: Response) =>
  response.status(200).json({ success: true, name: "GymFlow API", version: "1.0.0" })
);

// Autenticação Unificada
routes.post("/login", auth.login);

// Solicitação de Plano (Público)
routes.post("/solicitar-plano", planoController.solicitarPlano);

// Alunos
routes.get("/alunos", authentication, AlunoAcademia.list);
routes.post("/alunos", authentication, AlunoAcademia.create);
routes.get("/alunos/:id", authentication, AlunoAcademia.getById);
routes.put("/alunos/:id", authentication, AlunoAcademia.update);
routes.delete("/alunos/:id", authentication, AlunoAcademia.delete);

// Treinos
routes.get("/treinos", authentication, treino.list);
routes.post("/treinos", authentication, treino.create);
routes.get("/treinos/:id", authentication, treino.getById);
routes.put("/treinos/:id", authentication, treino.update);
routes.delete("/treinos/:id", authentication, treino.delete);

// Funcionários
routes.get("/funcionarios", authentication, Funcionarios.list);
routes.post("/funcionarios", authentication, Funcionarios.create);
routes.get("/funcionarios/:id", authentication, Funcionarios.getById);
routes.put("/funcionarios/:id", authentication, Funcionarios.update);
routes.put("/funcionarios/:id/senha", authentication, Funcionarios.alterarSenha);
routes.delete("/funcionarios/:id", authentication, Funcionarios.delete);

// Receitas (Entradas)
routes.get("/receitas", authentication, receita.list);
routes.post("/receitas", authentication, receita.create);
routes.get("/receitas/:id", authentication, receita.getById);
routes.put("/receitas/:id", authentication, receita.update);
routes.delete("/receitas/:id", authentication, receita.delete);

// Despesas (Saídas / Contas de Luz, Água, Internet)
routes.get("/despesas", authentication, despesas.index);
routes.get("/despesas/summary", authentication, despesas.summary);
routes.post("/despesas", authentication, despesas.create);
routes.put("/despesas/:id", authentication, despesas.update);
routes.delete("/despesas/:id", authentication, despesas.delete);

// Presenças (Acessos dos Alunos)
routes.post("/presencas", authentication, presencas.registrar);
routes.get("/presencas/hoje", authentication, presencas.hoje);

// Matrículas
routes.post("/matricular/:id", authentication, AlunoAcademia.matricular);
routes.delete("/desmatricular/:id", authentication, AlunoAcademia.desmatricular);

export default routes;