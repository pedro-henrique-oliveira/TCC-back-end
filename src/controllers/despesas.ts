import type { Request, Response } from "express";
import { prisma } from "../../config/prisma.js";

export default {
  // Listar todas as despesas
  index: async (_request: Request, response: Response) => {
    try {
      const despesas = await prisma.despesa.findMany({
        orderBy: { dataVencimento: "desc" },
      });

      return response.status(200).json({
        success: true,
        despesas,
      });
    } catch (error) {
      console.error("Erro ao listar despesas:", error);
      return response.status(500).json({
        success: false,
        message: "Erro interno ao listar despesas.",
      });
    }
  },

  // Resumo financeiro: Receitas, Despesas e Lucro Líquido
  summary: async (_request: Request, response: Response) => {
    try {
      const receitas = await prisma.receita.findMany();
      const despesas = await prisma.despesa.findMany();

      const totalReceitas = receitas.reduce((acc: number, r: { valorPagamento: string; }) => {
        const val = parseFloat(r.valorPagamento.replace(/[^0-9,.-]/g, "").replace(",", ".")) || 0;
        return acc + val;
      }, 0);

      const totalDespesas = despesas.reduce((acc: any, d: { valor: any; }) => acc + d.valor, 0);

      // Despesas por categoria (LUZ, AGUA, INTERNET, OUTROS)
      const despesasPorCategoria = despesas.reduce((acc: Record<string, number>, d: { categoria: string; valor: number; }) => {
        const cat = d.categoria.toUpperCase();
        acc[cat] = (acc[cat] || 0) + d.valor;
        return acc;
      }, {});

      return response.status(200).json({
        success: true,
        summary: {
          totalReceitas,
          totalDespesas,
          lucroLiquido: totalReceitas - totalDespesas,
          despesasPorCategoria,
        },
      });
    } catch (error) {
      console.error("Erro ao obter resumo financeiro:", error);
      return response.status(500).json({
        success: false,
        message: "Erro interno ao gerar resumo financeiro.",
      });
    }
  },

  // Criar despesa (ex: Conta de Luz, Água, Internet)
  create: async (request: Request, response: Response) => {
    try {
      const { descricao, valor, categoria, dataVencimento, dataPagamento, status } = request.body;

      if (!descricao || valor === undefined || !categoria || !dataVencimento) {
        return response.status(400).json({
          success: false,
          message: "Descrição, valor, categoria e data de vencimento são obrigatórios.",
        });
      }

      const novaDespesa = await prisma.despesa.create({
        data: {
          descricao,
          valor: parseFloat(valor),
          categoria: categoria.toUpperCase(),
          dataVencimento: new Date(dataVencimento),
          dataPagamento: dataPagamento ? new Date(dataPagamento) : null,
          status: status || "PENDENTE",
        },
      });

      return response.status(201).json({
        success: true,
        message: "Despesa cadastrada com sucesso.",
        despesa: novaDespesa,
      });
    } catch (error) {
      console.error("Erro ao criar despesa:", error);
      return response.status(500).json({
        success: false,
        message: "Erro ao cadastrar despesa.",
      });
    }
  },

  // Atualizar despesa
  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { descricao, valor, categoria, dataVencimento, dataPagamento, status } = request.body;

      const despesaExistente = await prisma.despesa.findUnique({
        where: { id: Number(id) },
      });

      if (!despesaExistente) {
        return response.status(404).json({
          success: false,
          message: "Despesa não encontrada.",
        });
      }

      const despesaAtualizada = await prisma.despesa.update({
        where: { id: Number(id) },
        data: {
          descricao: descricao ?? despesaExistente.descricao,
          valor: valor !== undefined ? parseFloat(valor) : despesaExistente.valor,
          categoria: categoria ? categoria.toUpperCase() : despesaExistente.categoria,
          dataVencimento: dataVencimento ? new Date(dataVencimento) : despesaExistente.dataVencimento,
          dataPagamento: dataPagamento ? new Date(dataPagamento) : despesaExistente.dataPagamento,
          status: status ?? despesaExistente.status,
        },
      });

      return response.status(200).json({
        success: true,
        message: "Despesa atualizada com sucesso.",
        despesa: despesaAtualizada,
      });
    } catch (error) {
      console.error("Erro ao atualizar despesa:", error);
      return response.status(500).json({
        success: false,
        message: "Erro ao atualizar despesa.",
      });
    }
  },

  // Excluir despesa
  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      await prisma.despesa.delete({
        where: { id: Number(id) },
      });

      return response.status(200).json({
        success: true,
        message: "Despesa removida com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao deletar despesa:", error);
      return response.status(500).json({
        success: false,
        message: "Erro ao remover despesa.",
      });
    }
  },
};
