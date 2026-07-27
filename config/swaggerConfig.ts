import packageJson from "../package.json";
import { prismaErrorResponses } from "./prismaSchemas";

const alunoSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    nome: { type: "string" },
    idade: { type: "integer" },
    cpf: { type: "integer" },
    email: { type: "string" },
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
const cursoSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    nome: { type: "string" },
    professor: { type: "string" },
    cargaHoraria: { type: "integer" },
    descricao: { type: "string" },
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
const alunoComCursosSchema = {
  allOf: [
    {
      $ref: "#/components/schemas/Aluno",
    },
    {
      type: "object",
      properties: {
        cursos: {
          type: "array",
          items: {
            $ref: "#/components/schemas/Curso",
          },
        },
      },
    },
  ],
};
const funcionarioSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
    },
    nome: {
      type: "string",
    },
    email: {
      type: "string",
      format: "email",
    },
    senha: {
      type: "string",
    },
    admin: {
      type: "boolean",
    },
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
                cpf: 12345678987,
                email: "alexandre@gmail.com",
                createdAt: "2026-05-04T11:29:00.588Z",
                updatedAt: "2026-05-04T11:29:00.588Z",
                cursos: [
                  {
                    id: 1,
                    nome: "Desenvolvimento de sistemas",
                    professor: "Marco",
                    cargaHoraria: 200,
                    descricao: "Backend e Frontend",
                    createdAt: "2026-05-04T11:29:00.588Z",
                    updatedAt: "2026-05-04T11:29:00.588Z",
                  },
                ],
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
            nome: "Alexandre",
            idade: 15,
            cpf: 12345678987,
            email: "alexandre@gmail.com",
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
              cpf: 12345678987,
              email: "alexandre@gmail.com",
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
              cpf: 12345678987,
              email: "alexandre@gmail.com",
              createdAt: "2026-05-04T11:29:00.588Z",
              updatedAt: "2026-05-04T11:29:00.588Z",
              cursos: [
                {
                  id: 1,
                  nome: "Desenvolvimento de sistemas",
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
const cursosRoutesNoId = {
  get: {
    tags: ["Cursos"],
    summary: "Lista de cursos",
    responses: {
      200: {
        description: "Lista recebida",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Curso",
              },
            },
            example: [
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
      ...prismaErrorResponses,
    },
  },

  post: {
    tags: ["Cursos"],
    summary: "Criar curso",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              nome: { type: "string" },
              professor: { type: "string" },
              cargaHoraria: { type: "integer" },
              descricao: { type: "string" },
            },
          },

          example: {
            nome: "Desenvolvimento de Sistemas",
            professor: "Marco",
            cargaHoraria: 200,
            descricao: "Backend e Frontend",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Curso criado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Curso",
            },
            example: {
              id: 1,
              nome: "Desenvolvimento de Sistemas",
              professor: "Marco",
              cargaHoraria: 200,
              descricao: "Backend e Frontend",
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
const cursosRoutesWithId = {
  get: {
    tags: ["Cursos"],
    summary: "Buscar curso por ID",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID do curso",
        schema: {
          type: "integer",
        },
        example: 1,
      },
    ],
    responses: {
      200: {
        description: "Curso encontrado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Curso",
            },
            example: {
              id: 1,
              nome: "Desenvolvimento de Sistemas",
              professor: "Marco",
              cargaHoraria: 200,
              descricao: "Backend e Frontend",
              createdAt: "2026-05-04T11:29:00.588Z",
              updatedAt: "2026-05-04T11:29:00.588Z",
            },
          },
        },
      },
      ...prismaErrorResponses,
    },
  },

  put: {
    tags: ["Cursos"],
    summary: "Atualizar curso",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID do curso",
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
              professor: { type: "string" },
              cargaHoraria: { type: "integer" },
              descricao: { type: "string" },
            },
          },

          example: {
            nome: "Desenvolvimento de Sistemas Avançado",
            professor: "Marco",
            cargaHoraria: 240,
            descricao: "Backend, Frontend e DevOps",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Curso atualizado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Curso",
            },
            example: {
              id: 1,
              nome: "Desenvolvimento de Sistemas Avançado",
              professor: "Marco",
              cargaHoraria: 240,
              descricao: "Backend, Frontend e DevOps",
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
    tags: ["Cursos"],
    summary: "Remover curso",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID do curso",
        schema: {
          type: "integer",
        },
        example: 1,
      },
    ],
    responses: {
      200: {
        description: "Curso removido",
        content: {
          "application/json": {
            schema: {
              type: "string",
            },
            example: "Curso removido com sucesso.",
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
                {
                  id: 2,
                  nome: "Banco de Dados",
                  professor: "Marco",
                  cargaHoraria: 80,
                  descricao: "Modelagem e SQL",
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
const funcionariosRoutesNoId = {
  get: {
    tags: ["Funcionários"],
    summary: "Lista de funcionários",
    responses: {
      200: {
        description: "Lista recebida",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Funcionario",
              },
            },
            example: [
              {
                id: 1,
                nome: "Marco",
                email: "marco@gmail.com",
                senha: "$2b$10...",
                admin: true,
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
    tags: ["Funcionários"],
    summary: "Criar funcionário",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              nome: { type: "string" },
              email: { type: "string" },
              senha: { type: "string" },
              admin: { type: "boolean" },
            },
          },
          example: {
            nome: "Marco",
            email: "marco@gmail.com",
            senha: "123456",
            admin: true,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Funcionário criado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Funcionario",
            },
            example: {
              id: 1,
              nome: "Marco",
              email: "marco@gmail.com",
              senha: "$2b$10...",
              admin: true,
              createdAt: "2026-05-04T11:29:00.588Z",
              updatedAt: "2026-05-04T11:29:00.588Z",
            },
          },
        },
      },
      ...prismaErrorResponses,
      403: {
        description: "Não autorizado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Erro",
            },
            examples: {
              "Funcionário não admin": "Não autorizado",
              ...prismaErrorResponses[403].content["application/json"].examples,
            },
          },
        },
      },
    },
  },
};
const funcionariosRoutesWithId = {
  get: {
    tags: ["Funcionários"],
    summary: "Buscar funcionário por ID",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID do funcionário",
        schema: {
          type: "integer",
        },
        example: 1,
      },
    ],
    responses: {
      200: {
        description: "Funcionário encontrado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Funcionario",
            },
            example: {
              id: 1,
              nome: "Marco",
              email: "marco@gmail.com",
              senha: "$2b$10...",
              admin: true,
              createdAt: "2026-05-04T11:29:00.588Z",
              updatedAt: "2026-05-04T11:29:00.588Z",
            },
          },
        },
      },
      ...prismaErrorResponses,
    },
  },

  put: {
    tags: ["Funcionários"],
    summary: "Atualizar funcionário",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID do funcionário",
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
              email: { type: "string" },
              senha: { type: "string" },
              admin: { type: "boolean" },
            },
          },
          example: {
            nome: "Marco Atualizado",
            email: "marco@gmail.com",
            senha: "123456",
            admin: true,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Funcionário atualizado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Funcionario",
            },
            example: {
              id: 1,
              nome: "Marco Atualizado",
              email: "marco@gmail.com",
              senha: "$2b$10...",
              admin: true,
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
    tags: ["Funcionários"],
    summary: "Remover funcionário",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID do funcionário",
        schema: {
          type: "integer",
        },
        example: 1,
      },
    ],
    responses: {
      200: {
        description: "Funcionário removido",
        content: {
          "application/json": {
            schema: {
              type: "string",
            },
            example: "Funcionário removido com sucesso.",
          },
        },
      },
      ...prismaErrorResponses,
    },
  },
};
const funcionariosLoginRoute = {
  post: {
    tags: ["Funcionários"],
    summary: "Login de funcionário",

    security: [],

    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
              },
              senha: {
                type: "string",
              },
            },
          },
          example: {
            email: "marco@gmail.com",
            senha: "123456",
          },
        },
      },
    },

    responses: {
      200: {
        description: "Login realizado com sucesso",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                access_token: {
                  type: "string",
                },
              },
            },
            example: {
              access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },
      },
      ...prismaErrorResponses,
      404: {
        description: "Email ou senha inválidos",
        content: {
          "application/json": {
            schema: {
              type: "string",
              example: "Email e/ou senha inválidos",
            },
          },
        },
      },
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
    "/cursos": cursosRoutesNoId,
    "/cursos/{id}": cursosRoutesWithId,
    "/matriculas/{id}": matriculasRoutesWithId,
    "/funcionarios": funcionariosRoutesNoId,
    "/funcionarios/{id}": funcionariosRoutesWithId,
    "/funcionarios/login": funcionariosLoginRoute,
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
      name: "Cursos",
      description: "CRUD de cursos",
    },
    {
      name: "Matrículas",
      description: "Gerenciamento das matrículas dos alunos",
    },
    {
      name: "Funcionários",
      description: "CRUD de funcionários",
    },
  ],
  components: {
    schemas: {
      Aluno: alunoSchema,
      AlunoComCursos: alunoComCursosSchema,
      Curso: cursoSchema,
      Funcionario: funcionarioSchema,
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