import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../config/prisma.js";

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

      // 1. Tentar autenticar como Funcionário ou Admin
      const funcionario = await prisma.funcionarios.findFirst({
        where: { email },
      });

      if (funcionario) {
        let senhaValida = false;
        try {
          senhaValida = await bcrypt.compare(senha, funcionario.senha);
        } catch {
          senhaValida = funcionario.senha === senha;
        }

        if (!senhaValida && funcionario.senha === senha) {
          senhaValida = true;
        }

        if (!senhaValida) {
          return response.status(401).json({
            success: false,
            message: "E-mail ou senha incorretos.",
          });
        }

        const role = funcionario.adm ? "ADMIN" : "FUNCIONARIO";

        const token = jwt.sign(
          {
            id: funcionario.id,
            nome: funcionario.nome,
            email: funcionario.email,
            cargo: funcionario.cargo,
            role,
          },
          process.env.JWT_SECRET || "secreto_tcc_gymflow",
          { expiresIn: "1d" }
        );

        return response.status(200).json({
          success: true,
          message: "Login de funcionário realizado com sucesso.",
          token,
          user: {
            id: funcionario.id,
            nome: funcionario.nome,
            email: funcionario.email,
            cargo: funcionario.cargo,
            adm: funcionario.adm,
            role,
          },
          funcionario: {
            id: funcionario.id,
            nome: funcionario.nome,
            email: funcionario.email,
            cargo: funcionario.cargo,
            adm: funcionario.adm,
          },
        });
      }

      return response.status(401).json({
        success: false,
        message: "E-mail ou senha incorretos.",
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