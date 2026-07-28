import packageJson from "../package.json";
import { prismaErrorResponses } from "./prismaSchemas";

const alunoSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    nome: { type: "string" },
    idade: { type: "integer" },
    dataNascimento: { type: "string" },
    cpf: { type: "integer" },
    email: { type: "string" },
    plano: { type: "string" },
    createdAt: {
      type: "string",
      format: "date-time",
    },
    updatedAt: {
      type: "string",
      format: "date-time",
    },
  },
};

const errorSchema = {
  type: "string",
  example: "Unique constraint failed on the constraint.",
};

const initialRoute = {
  get: {
    security: [],
    tags: ["Rota Inicial"],
    summary: "Rota inicial",
    responses: {
      200: {
        description: "Sucesso",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                },
              },
              example: {
                success: true,
              },
            },
          },
        },
      },
    },
  },
};
const alunosRoutesNoId = {
  get: {
    tags: ["Alunos"],
    summary: "Lista de alunos",
    responses: {
      200: {
        description: "Lista recebida",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/AlunoComCursos",
              },
            },
            example: [
              {
                id: 1,
                nome: "Alexandre",
                idade: 15,
                dataNascimento: "2026-05-04T11:29:00.588Z",
                email: "alexandre@gmail.com",
                cpf: 12345678987,
                plano: "R$ 199.99",
                createdAt: "2026-05-04T11:29:00.588Z",
                updatedAt: "2026-05-04T11:29:00.588Z",
                
              },
            ],
          },
        },
      },
      ...prismaErrorResponses,
    },
  },

  post: {
    tags: ["Alunos"],
    summary: "Criar aluno",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              nome: { type: "string" },
              idade: { type: "integer" },
              cpf: { type: "integer" },
              email: { type: "string" },
            },
          },

          example: {
                id: 1,
                nome: "Alexandre",
                idade: 15,
                dataNascimento: "2026-05-04T11:29:00.588Z",
                email: "alexandre@gmail.com",
                cpf: 12345678987,
                plano: "R$ 199.99",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Aluno criado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Aluno",
            },
            example: {
                id: 1,
                nome: "Alexandre",
                idade: 15,
                dataNascimento: "2026-05-04T11:29:00.588Z",
                email: "alexandre@gmail.com",
                cpf: 12345678987,
                plano: "R$ 199.99",
              createdAt: "2026-05-04T11:29:00.588Z",
              updatedAt: "2026-05-04T11:29:00.588Z",
            },
          },
        },
      },
      ...prismaErrorResponses,
    },
  },
};
const alunosRoutesWithId = {
  get: {
    tags: ["Alunos"],
    summary: "Buscar aluno por ID",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID do aluno",
        schema: {
          type: "integer",
        },
        example: 1,
      },
    ],
    responses: {
      200: {
        description: "Aluno encontrado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AlunoComCursos",
            },
            example: {
                id: 1,
                nome: "Alexandre",
                idade: 15,
                dataNascimento: "2026-05-04T11:29:00.588Z",
                email: "alexandre@gmail.com",
                cpf: 12345678987,
                plano: "R$ 199.99",
              createdAt: "2026-05-04T11:29:00.588Z",
              updatedAt: "2026-05-04T11:29:00.588Z",
              cursos: [
              ],
            },
          },
        },
      },
      ...prismaErrorResponses,
    },
  },

  put: {
    tags: ["Alunos"],
    summary: "Atualizar aluno",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID do aluno",
        schema: {
          type: "integer",
        },
        example: 1,
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              nome: { type: "string" },
              idade: { type: "integer" },
              cpf: { type: "integer" },
              email: { type: "string" },
            },
          },
          example: {
            nome: "Alexandre Atualizado",
            idade: 16,
            cpf: 12345678987,
            email: "alexandre@gmail.com",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Aluno atualizado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Aluno",
            },
            example: {
              id: 1,
              nome: "Alexandre Atualizado",
              idade: 16,
              cpf: 12345678987,
              email: "alexandre@gmail.com",
              createdAt: "2026-05-04T11:29:00.588Z",
              updatedAt: "2026-06-17T15:30:00.000Z",
            },
          },
        },
      },
      ...prismaErrorResponses,
    },
  },

  delete: {
    tags: ["Alunos"],
    summary: "Remover aluno",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID do aluno",
        schema: {
          type: "integer",
        },
        example: 1,
      },
    ],
    responses: {
      200: {
        description: "Aluno removido",
        content: {
          "application/json": {
            schema: {
              type: "string",
            },
            example: "Aluno removido com sucesso.",
          },
        },
      },
      ...prismaErrorResponses,
    },
  },
};

const matriculasRoutesWithId = {
  post: {
    tags: ["Matrículas"],
    summary: "Matricular aluno em cursos",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID do aluno",
        schema: {
          type: "integer",
        },
        example: 1,
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              cursosId: {
                type: "array",
                items: {
                  type: "integer",
                },
              },
            },
          },
          example: {
            cursosId: [1, 2, 3],
          },
        },
      },
    },
    responses: {
      201: {
        description: "Matrículas realizadas",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AlunoComCursos",
            },
            example: {
                id: 1,
                nome: "Alexandre",
                idade: 15,
                dataNascimento: "2026-05-04T11:29:00.588Z",
                email: "alexandre@gmail.com",
                cpf: 12345678987,
                plano: "R$ 199.99",
              createdAt: "2026-05-04T11:29:00.588Z",
              updatedAt: "2026-05-04T11:29:00.588Z",
            },
          },
        },
      },
      ...prismaErrorResponses,
    },
  },

  delete: {
    tags: ["Matrículas"],
    summary: "Remover matrículas do aluno",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID do aluno",
        schema: {
          type: "integer",
        },
        example: 1,
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              cursosId: {
                type: "array",
                items: {
                  type: "integer",
                },
              },
            },
          },
          example: {
            cursosId: [2, 3],
          },
        },
      },
    },
    responses: {
      200: {
        description: "Matrículas removidas",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AlunoComCursos",
            },
            example: {
              id: 1,
              nome: "Alexandre",
              idade: 15,
              cpf: 12345678987,
              email: "alexandre@gmail.com",
              createdAt: "2026-05-04T11:29:00.588Z",
              updatedAt: "2026-05-04T11:29:00.588Z",
              cursos: [
                {
                  id: 1,
                  nome: "Desenvolvimento de Sistemas",
                  professor: "Marco",
                  cargaHoraria: 200,
                  descricao: "Backend e Frontend",
                  createdAt: "2026-05-04T11:29:00.588Z",
                  updatedAt: "2026-05-04T11:29:00.588Z",
                },
              ],
            },
          },
        },
      },
      ...prismaErrorResponses,
    },
  },
};


export default {
  openapi: "3.2.0",
  info: {
    title: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
  },
  servers: [
    {
      url: "http://localhost:8080",
    },
  ],
  paths: {
    "/": initialRoute,
    "/alunos": alunosRoutesNoId,
    "/alunos/{id}": alunosRoutesWithId,
    "/matriculas/{id}": matriculasRoutesWithId,
  },
  tags: [
    {
      name: "Rota Inicial",
      description: "Checar funcionamento do servidor",
    },
    {
      name: "Alunos",
      description: "CRUD de alunos",
    },
    {
      name: "Matrículas",
      description: "Gerenciamento das matrículas dos alunos",
    },
  ],
  components: {
    schemas: {
      Aluno: alunoSchema,
      Erro: errorSchema,
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};