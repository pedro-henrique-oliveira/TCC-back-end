import type { Request, Response } from "express";
import { prisma } from "../../config/prisma.js";
import { handleError } from "../../helpers/hendleErro.js";

export default {
  create: async (request: Request, response: Response) => {
    try {
      const {
        nome,
        email,
        idade,
        cpf,
        dataNascimento,
        plano,
      } = request.body;

      if (!nome || !email || idade === undefined || !cpf) {
        return response.status(400).json({
          error: "Dados do Aluno incompletos",
        });
      }

      const user = await prisma.alunos.create({
        data: {
          nome,
          email,
          idade: Number(idade),
          cpf,
          dataNascimento: dataNascimento
            ? new Date(dataNascimento)
            : undefined,
          plano,
      }});

      return response.status(201).json(user);
    } catch (e) {
      return handleError(e, response);
    }
  },

  list: async (_request: Request, response: Response) => {
    try {
      const users = await prisma.alunos.findMany();

      return response.status(200).json(users);
    } catch (e) {
      return handleError(e, response);
    }
  },

  getById: async (request: Request, response: Response) => {
    try {
      const id = Number(request.params.id);

      const user = await prisma.alunos.findUnique({
        where: { id },
      });

      if (!user) {
        return response.status(404).json({
          error: "Aluno não encontrado",
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
        cpf,
        dataNascimento,
        plano,
      } = request.body;

      const user = await prisma.alunos.update({
        where: { id },
        data: {
          nome,
          email,
          idade: idade !== undefined ? Number(idade) : undefined,
          cpf,
          dataNascimento: dataNascimento
            ? new Date(dataNascimento)
            : undefined,
          plano,
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

      const user = await prisma.alunos.delete({
        where: { id },
      });

      return response.status(200).json(user);
    } catch (e) {
      return handleError(e, response);
    }
  },


 // VINCULAR FUNCIONÁRIOS AO ALUNO
matricular: async (request: Request, response: Response) => {
  try {
    const alunoId = Number(request.params.id);
    const { funcionariosId } = request.body;

    if (
      !funcionariosId
    ) {
      return response.status(400).json({
        error: "funcionariosId é obrigatório",
      });
    }

    const aluno = await prisma.alunos.findUnique({
      where: {
        id: alunoId,
      },
    });

    if (!aluno) {
      return response.status(404).json({
        error: "Aluno não encontrado",
      });
    }

    const alunoAtualizado = await prisma.alunos.update({
      where: {
        id: alunoId,
      },
      data: {
        funcionario: {
          connect: {
            id: Number(funcionariosId),
          }
        },
      },
      include: {
        funcionario: true,
      },
    });

    return response.status(200).json(alunoAtualizado);
  } catch (e) {
    return handleError(e, response);
  }
},

desmatricular: async (request: Request, response: Response) => {
  try {
    const alunoId = Number(request.params.id);
    const { funcionariosId } = request.body;

    if (
      !funcionariosId 
    ) {
      return response.status(400).json({
        error: "funcionariosId é obrigatório",
      });
    }

    const aluno = await prisma.alunos.findUnique({
      where: {
        id: alunoId,
      },
      include: {
        funcionario: true,
      },
    });

    if (!aluno) {
      return response.status(404).json({
        error: "Aluno não encontrado",
      });
    }

    const funcionarioAtualizado = await prisma.funcionarios.update({
      where: {
        id: alunoId,
      },
      data: {
        alunos: {
          disconnect: {
            id: Number(alunoId),
          }
        }
      },
      include: {
        alunos: true,
      },
    });

    return response.status(200).json(funcionarioAtualizado);
  } catch (e) {
    return handleError(e, response);
  }
},
};