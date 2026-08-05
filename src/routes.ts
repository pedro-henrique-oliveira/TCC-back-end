import { Router, type Request, type Response } from "express";
import AlunoAcademia from "./controllers/AlunoAcademia";
import Funcionarios from "./controllers/funcionarios";
import receita from "./controllers/receita";

const routes = Router();

routes.get("/", (_request: Request, response: Response) =>
  response.status(200).json({ succes: true }),
);


routes.get("/alunos", AlunoAcademia.list);
routes.post("/alunos", AlunoAcademia.create);
routes.get("/alunos/:id", AlunoAcademia.getById);
routes.put("/alunos/:id", AlunoAcademia.update);
routes.delete("/alunos/:id", AlunoAcademia.delete);


routes.get("/funcionarios", Funcionarios.list);
routes.post("/funcionarios", Funcionarios.create);
routes.get("/funcionarios/:id", Funcionarios.getById);
routes.put("/funcionarios/:id", Funcionarios.update);
routes.delete("/funcionarios/:id", Funcionarios.delete);


routes.get("/receitas", receita.list);
routes.post("/receitas", receita.create);
routes.get("/receitas/:id", receita.getById);
routes.put("/receitas/:id", receita.update);
routes.delete("/receitas/:id", receita.delete);


routes.post("/matricular/:id", AlunoAcademia.matricular);
routes.delete("/desmatricular/:id", AlunoAcademia.desmatricular);

export default routes;