import type { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import { handleError } from "../../helpers/hendleErro";

export default {
  // CRIAR TREINO
  create: async (request: Request, response: Response) => {
    try {
      const {
        nome,
        descricao,
        dificuldade,
        duracao,
        tipoTreino,
        alunoId,
      } = request.body;

      if (
        !nome ||
        !descricao ||
        !dificuldade ||
        duracao === undefined ||
        !tipoTreino ||
        alunoId === undefined
      ) {
        return response.status(400).json({
          error: "Dados do treino incompletos",
        });
      }

      const treino = await prisma.treino.create({
        data: {
          nome,
          descricao,
          dificuldade,
          duracao: Number(duracao),
          tipoTreino,
          alunoId: Number(alunoId),
        },
        include: {
          aluno: true,
        },
      });

      return response.status(201).json(treino);
    } catch (e) {
      return handleError(e, response);
    }
  },

  // LISTAR TODOS OS TREINOS
  list: async (_request: Request, response: Response) => {
    try {
      const treinos = await prisma.treino.findMany({
        include: {
          aluno: true,
        },
      });

      return response.status(200).json(treinos);
    } catch (e) {
      return handleError(e, response);
    }
  },

  // BUSCAR TREINO POR ID
  getById: async (request: Request, response: Response) => {
    try {
      const id = Number(request.params.id);

      const treino = await prisma.treino.findUnique({
        where: { id },
        include: {
          aluno: true,
        },
      });

      if (!treino) {
        return response.status(404).json({
          error: "Treino não encontrado",
        });
      }

      return response.status(200).json(treino);
    } catch (e) {
      return handleError(e, response);
    }
  },

  // ATUALIZAR TREINO
  update: async (request: Request, response: Response) => {
    try {
      const id = Number(request.params.id);

      const {
        nome,
        descricao,
        dificuldade,
        duracao,
        tipoTreino,
        alunoId,
      } = request.body;

      const treino = await prisma.treino.update({
        where: { id },
        data: {
          nome,
          descricao,
          dificuldade,
          duracao:
            duracao !== undefined
              ? Number(duracao)
              : undefined,
          tipoTreino,
          alunoId:
            alunoId !== undefined
              ? Number(alunoId)
              : undefined,
        },
        include: {
          aluno: true,
        },
      });

      return response.status(200).json(treino);
    } catch (e) {
      return handleError(e, response);
    }
  },

  // DELETAR TREINO
  delete: async (request: Request, response: Response) => {
    try {
      const id = Number(request.params.id);

      const treino = await prisma.treino.delete({
        where: { id },
      });

      return response.status(200).json(treino);
    } catch (e) {
      return handleError(e, response);
    }
  },

  // LISTAR TREINOS DE UM ALUNO
  getByAluno: async (request: Request, response: Response) => {
    try {
      const alunoId = Number(request.params.alunoId);

      const treinos = await prisma.treino.findMany({
        where: {
          alunoId,
        },
        include: {
          aluno: true,
        },
      });

      return response.status(200).json(treinos);
    } catch (e) {
      return handleError(e, response);
    }
  },
};