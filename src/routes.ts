import { Router, type Request, type Response } from "express";
import AlunoAcademia from "./controllers/AlunoAcademia";

const routes = Router();

routes.get("/", (_request: Request, response: Response) =>
  response.status(200).json({ succes: true }),
);

routes.get("/alunos",  AlunoAcademia.list);
routes.post("/alunos",  AlunoAcademia.create);
routes.get("/alunos/:id",  AlunoAcademia.getById);
routes.put("/alunos/:id",  AlunoAcademia.update);
routes.delete("/alunos/:id",  AlunoAcademia.delete);


routes.post('/matricular/:id',  AlunoAcademia.matricular);
routes.delete('/desmatricular/:id',  AlunoAcademia.desmatricular)

export default routes;