import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma";

export default {
  login: async (request: Request, response: Response) => {
    try {
      const { email, senha } = request.body;

      if (!email || !senha) {
        return response.status(400).json({
          success: false,
          message: "E-mail e senha são obrigatórios.",
        });
      }

      const Funcionario = await prisma.funcionarios.findFirst({
        where: {
          email,
        },
      });

      if (!Funcionario) {
        return response.status(401).json({
          success: false,
          message: "E-mail ou senha incorretos.",
        });
      }

      const senhaValida = await bcrypt.compare(
        senha,
        Funcionario.senha,
      );

      if (!senhaValida) {
        return response.status(401).json({
          success: false,
          message: "E-mail ou senha incorretos.",
        });
      }

      const token = jwt.sign(
        {
          id: Funcionario.id,
          nome: Funcionario.nome,
          email: Funcionario.email,
          cargo: Funcionario.cargo,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1d",
        },
      );

      return response.status(200).json({
        success: true,
        message: "Login realizado com sucesso.",
        token,
        Funcionario: {
          id: Funcionario.id,
          nome: Funcionario.nome,
          email: Funcionario.email,
          cargo: Funcionario.cargo,
        },
      });
    } catch (error) {
      console.error("Erro no login:", error);

      return response.status(500).json({
        success: false,
        message: "Erro interno do servidor.",
      });
    }
  },
};