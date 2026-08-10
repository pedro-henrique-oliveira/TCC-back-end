import { Router, type Request, type Response } from "express";
import AlunoAcademia from "./controllers/AlunoAcademia";
import Funcionarios from "./controllers/funcionarios";
import receita from "./controllers/receita";
import treino from "./controllers/treinos";
import { authentication } from "./middlewares/authentication";
import auth from "./controllers/auth";

const routes = Router();

routes.get("/", (_request: Request, response: Response) =>
  response.status(200).json({ succes: true }),
);

routes.post("/login", auth.login);

routes.get("/alunos", authentication,  AlunoAcademia.list);
routes.post("/alunos", authentication, AlunoAcademia.create);
routes.get("/alunos/:id", authentication, AlunoAcademia.getById);
routes.put("/alunos/:id",authentication, AlunoAcademia.update);
routes.delete("/alunos/:id", authentication, AlunoAcademia.delete);

routes.get("/treinos", authentication, treino.list);
routes.post("/treinos", authentication, treino.create);
routes.get("/treinos/:id", authentication, treino.getById);
routes.put("/treinos/:id", authentication, treino.update);
routes.delete("/treinos/:id", authentication, treino.delete);

routes.get("/funcionarios", authentication, Funcionarios.list);
routes.post("/funcionarios", authentication, Funcionarios.create);
routes.get("/funcionarios/:id", authentication, Funcionarios.getById);
routes.put("/funcionarios/:id", authentication, Funcionarios.update);
routes.delete("/funcionarios/:id", authentication, Funcionarios.delete);


routes.get("/receitas", authentication, receita.list);
routes.post("/receitas", authentication, receita.create);
routes.get("/receitas/:id", authentication, receita.getById);
routes.put("/receitas/:id", authentication, receita.update);
routes.delete("/receitas/:id", authentication, receita.delete);


routes.post("/matricular/:id", authentication, AlunoAcademia.matricular);
routes.delete("/desmatricular/:id", authentication, AlunoAcademia.desmatricular);

export default routes;