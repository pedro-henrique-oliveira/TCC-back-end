import type { Request, Response } from "express";
import { prisma } from "../../config/prisma.js";

export default {
  // Registrar presença do aluno
  registrar: async (request: Request, response: Response) => {
    try {
      const { alunoId } = request.body;

      if (!alunoId) {
        return response.status(400).json({
          success: false,
          message: "O ID do aluno é obrigatório.",
        });
      }

      const aluno = await prisma.alunos.findUnique({
        where: { id: Number(alunoId) },
      });

      if (!aluno) {
        return response.status(404).json({
          success: false,
          message: "Aluno não encontrado.",
        });
      }

      const novaPresenca = await prisma.presenca.create({
        data: {
          alunoId: Number(alunoId),
        },
        include: {
          aluno: {
            select: {
              id: true,
              nome: true,
              email: true,
              plano: true,
            },
          },
        },
      });

      await prisma.alunos.update({
        where: { id: Number(alunoId) },
        data: { ultimoAcesso: new Date() },
      });

      return response.status(201).json({
        success: true,
        message: "Presença registrada com sucesso.",
        presenca: novaPresenca,
      });
    } catch (error) {
      console.error("Erro ao registrar presença:", error);
      return response.status(500).json({
        success: false,
        message: "Erro ao registrar presença.",
      });
    }
  },

  // Listar presenças do dia (Alunos presentes hoje)
  hoje: async (_request: Request, response: Response) => {
    try {
      const inicioDia = new Date();
      inicioDia.setHours(0, 0, 0, 0);

      const fimDia = new Date();
      fimDia.setHours(23, 59, 59, 999);

      const presencas = await prisma.presenca.findMany({
        where: {
          dataHora: {
            gte: inicioDia,
            lte: fimDia,
          },
        },
        include: {
          aluno: {
            select: {
              id: true,
              nome: true,
              email: true,
              plano: true,
              cpf: true,
            },
          },
        },
        orderBy: { dataHora: "desc" },
      });

      return response.status(200).json({
        success: true,
        totalPresentes: presencas.length,
        presencas,
      });
    } catch (error) {
      console.error("Erro ao listar presenças de hoje:", error);
      return response.status(500).json({
        success: false,
        message: "Erro ao obter presenças de hoje.",
      });
    }
  },
};
