import type { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { handleError } from "../../helpers/hendleErro";

export default {
  create: async (request: Request, response: Response) => {
    try {
      const {
        nome,
        email,
        senha,
        idade,
        dataNascimento,
        cpf,
        clt,
        turno,
        cargo,
      } = request.body;

      if (!nome || !email || !senha || idade === undefined || !dataNascimento || !cpf || !clt || !turno || !cargo) {
        return response.status(400).json({
          error: "Dados do Funcionario incompletos",    
        });
      }

      const user = await prisma.funcionarios.create({
        data: {
          nome,
          email,
          senha,
          idade: Number(idade),
          dataNascimento: dataNascimento
            ? new Date(dataNascimento)
            : undefined,
          cpf,
          clt,
          turno,
          cargo,
          
        },
      });

      return response.status(201).json(user);
    } catch (e) {
      return handleError(e, response);
    }
  },

  list: async (_request: Request, response: Response) => {
    try {
      const users = await prisma.funcionarios.findMany();

      return response.status(200).json(users);
    } catch (e) {
      return handleError(e, response);
    }
  },

  getById: async (request: Request, response: Response) => {
    try {
      const id = Number(request.params.id);

      const user = await prisma.funcionarios.findUnique({
        where: { id },
      });

      if (!user) {
        return response.status(404).json({
          error: "Funcionario não encontrado",
        });
      }

      return response.status(200).json(user);
    } catch (e) {
      return handleError(e, response);
    }
  },

  update: async (request: Request, response: Response) => {
    try {
      const id = Number(request.params.id);

      const {
        nome,
        email,
        idade,
        dataNascimento,
        cpf,
        clt,
        turno,
        cargo,
      } = request.body;

      const user = await prisma.funcionarios.update({
        where: { id },
        data: {
          nome,
          email,
          idade: idade !== undefined ? Number(idade) : undefined,
          cpf,
          dataNascimento: dataNascimento
            ? new Date(dataNascimento)
            : undefined,
          clt,
          turno,
          cargo,
        },
      });

      return response.status(200).json(user);
    } catch (e) {
      return handleError(e, response);
    }
  },

  delete: async (request: Request, response: Response) => {
    try {
      const id = Number(request.params.id);

      const user = await prisma.funcionarios.delete({
        where: { id },
      });

      return response.status(200).json(user);
    } catch (e) {
      return handleError(e, response);
    }
  },
};