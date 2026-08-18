import type { Request, Response } from "express";
import { prisma } from "../../config/prisma.js";
import { handleError } from "../../helpers/hendleErro.js";

export default {
  create: async (request: Request, response: Response) => {
    try {
      const {
        pagamento,
        dataPagamento,
        valorPagamento,
        status,
        formaPagamento,
      } = request.body;

      if (
        !pagamento ||
        !dataPagamento ||
        !valorPagamento ||
        !status ||
        !formaPagamento
      ) {
        return response.status(400).json({
          error: "Dados da receita incompletos",
        });
      }

      const receita = await prisma.receita.create({
        data: {
          pagamento,
          dataPagamento: new Date(dataPagamento),
          valorPagamento,
          status,
          formaPagamento,
        },
      });

      return response.status(201).json(receita);
    } catch (e) {
      return handleError(e, response);
    }
  },

  list: async (_request: Request, response: Response) => {
    try {
      const receitas = await prisma.receita.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return response.status(200).json(receitas);
    } catch (e) {
      return handleError(e, response);
    }
  },

  getById: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const receita = await prisma.receita.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!receita) {
        return response.status(404).json({
          error: "Receita não encontrada",
        });
      }

      return response.status(200).json(receita);
    } catch (e) {
      return handleError(e, response);
    }
  },

  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const {
        pagamento,
        dataPagamento,
        valorPagamento,
        status,
        formaPagamento,
      } = request.body;

      if (
        !pagamento ||
        !dataPagamento ||
        !valorPagamento ||
        !status ||
        !formaPagamento
      ) {
        return response.status(400).json({
          error: "Dados da receita incompletos",
        });
      }

      const receitaExistente = await prisma.receita.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!receitaExistente) {
        return response.status(404).json({
          error: "Receita não encontrada",
        });
      }

      const receita = await prisma.receita.update({
        where: {
          id: Number(id),
        },
        data: {
          pagamento,
          dataPagamento: new Date(dataPagamento),
          valorPagamento,
          status,
          formaPagamento,
        },
      });

      return response.status(200).json(receita);
    } catch (e) {
      return handleError(e, response);
    }
  },

  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const receitaExistente = await prisma.receita.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!receitaExistente) {
        return response.status(404).json({
          error: "Receita não encontrada",
        });
      }

      await prisma.receita.delete({
        where: {
          id: Number(id),
        },
      });

      return response.status(200).json({
        message: "Receita removida com sucesso.",
      });
    } catch (e) {
      return handleError(e, response);
    }
  },
};