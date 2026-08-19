import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma.js";
import { handleError } from "../../helpers/hendleErro.js";

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

      const senhaHash = await bcrypt.hash(senha, 10);

      const user = await prisma.funcionarios.create({
        data: {
          nome,
          email,
          senha: senhaHash,
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
        senha,
      } = request.body;

      let senhaHash: string | undefined;
      if (senha) {
        senhaHash = await bcrypt.hash(senha, 10);
      }

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
          ...(senhaHash ? { senha: senhaHash } : {}),
        },
      });

      return response.status(200).json(user);
    } catch (e) {
      return handleError(e, response);
    }
  },

  alterarSenha: async (request: Request, response: Response) => {
    try {
      const id = Number(request.params.id);
      const { senhaAtual, novaSenha } = request.body;

      if (!senhaAtual || !novaSenha) {
        return response.status(400).json({
          error: "Senha atual e nova senha são obrigatórias.",
        });
      }

      if (novaSenha.length < 6) {
        return response.status(400).json({
          error: "A nova senha deve ter pelo menos 6 caracteres.",
        });
      }

      const funcionario = await prisma.funcionarios.findUnique({
        where: { id },
      });

      if (!funcionario) {
        return response.status(404).json({
          error: "Funcionário não encontrado.",
        });
      }

      // Validar senha atual
      let senhaValida = false;
      try {
        senhaValida = await bcrypt.compare(senhaAtual, funcionario.senha);
      } catch {
        senhaValida = funcionario.senha === senhaAtual;
      }

      if (!senhaValida && funcionario.senha === senhaAtual) {
        senhaValida = true;
      }

      if (!senhaValida) {
        return response.status(400).json({
          error: "Senha atual incorreta.",
        });
      }

      // Criptografar nova senha
      const senhaHash = await bcrypt.hash(novaSenha, 10);

      await prisma.funcionarios.update({
        where: { id },
        data: {
          senha: senhaHash,
        },
      });

      return response.status(200).json({
        success: true,
        message: "Senha alterada com sucesso.",
      });
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