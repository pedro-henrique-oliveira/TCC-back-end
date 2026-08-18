import type { Request, Response } from "express";
import { prisma } from "../../config/prisma.js";
import { handleError } from "../../helpers/hendleErro.js";
export default {
  solicitarPlano: async (request: Request, response: Response) => {
    try {
      const {
        plano,
        ciclo,
        valor,
        formaPagamento,
        nomeAcademia,
        responsavel,
        email,
        cpfCnpj,
        telefone,
      } = request.body;
      if (!plano || !valor || !formaPagamento || !nomeAcademia || !email) {
        return response.status(400).json({
          success: false,
          error: "Dados incompletos para a solicitação de plano.",
        });
      }
      const statusPagamento =
        formaPagamento === "Boleto Bancário" ? "PENDENTE" : "CONCLUIDO";
      // 1. Criar registro de receita no financeiro da academia
      const novaReceita = await prisma.receita.create({
        data: {
          pagamento: `Assinatura Plano ${plano} (${ciclo || "mensal"}) - ${nomeAcademia}`,
          dataPagamento: new Date(),
          valorPagamento:
            typeof valor === "number"
              ? `R$ ${valor.toFixed(2)}`
              : String(valor),
          status: statusPagamento,
          formaPagamento: String(formaPagamento),
        },
      });
      // 2. Se houver e-mail e responsável, garantir que haja ou crie um registro básico de aluno/cliente
      let alunoExistente = await prisma.alunos.findFirst({
        where: { email },
      });
      if (!alunoExistente && responsavel && cpfCnpj) {
        try {
          alunoExistente = await prisma.alunos.create({
            data: {
              nome: `${responsavel} (${nomeAcademia})`,
              email,
              cpf: cpfCnpj,
              plano: String(plano),
            },
          });
        } catch {
          // Se falhar o cadastro do aluno (ex: validações de campos nulos), prossegue com o pedido de assinatura registrado na receita
        }
      }
      const pedidoId = `GYM-${Math.floor(100000 + Math.random() * 900000)}`;
      return response.status(201).json({
        success: true,
        message: "Solicitação de plano realizada com sucesso!",
        pedido: {
          id: pedidoId,
          receitaId: novaReceita.id,
          plano,
          ciclo: ciclo || "mensal",
          valor,
          formaPagamento,
          statusPagamento,
          nomeAcademia,
          responsavel,
          email,
          createdAt: novaReceita.createdAt,
        },
      });
    } catch (e) {
      return handleError(e, response);
    }
  },
};
