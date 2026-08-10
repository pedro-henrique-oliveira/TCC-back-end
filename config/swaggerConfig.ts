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

const treinoSchema = {
  type: "object",
  properties: {
    id: { type: "integer", example: 1 },
    nome: { type: "string", example: "Treino de Peito" },
    descricao: {
      type: "string",
      example: "Treino focado em peito e tríceps",
    },
    dificuldade: {
      type: "string",
      example: "Intermediário",
    },
    duracao: {
      type: "integer",
      example: 60,
      description: "Duração do treino em minutos",
    },
    tipoTreino: {
      type: "string",
      example: "Hipertrofia",
    },
    alunoId: {
      type: "integer",
      example: 1,
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


const funcionarioSchema = {
  type: "object",
  properties: {
    id: { type: "integer", example: 1 },
    nome: { type: "string", example: "Funcionario 1" },
    email: { type: "string", example: "funcionario@gmail.com" },
    idade: { type: "integer", example: 22 },
    dataNascimento: {
      type: "string",
      format: "date-time",
      example: "2002-05-26T14:30:00.000Z",
    },
    cpf: { type: "integer", example: 12345678910 },
    clt: { type: "integer", example: 1234 },
    turno: { type: "string", example: "manhã" },
    cargo: { type: "string", example: "Gerente" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
};

const receitaSchema = {
  type: "object",
  properties: {
    id: { type: "integer", example: 1 },
    pagamento: { type: "string", example: "Mensalidade" },
    dataPagamento: {
      type: "string",
      format: "date-time",
      example: "2026-08-04T10:00:00.000Z",
    },
    valorPagamento: { type: "string", example: "150.00" },
    status: { type: "string", example: "Pago" },
    formaPagamento: { type: "string", example: "Pix" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
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

const treinosRoutesNoId = {
  get: {
    tags: ["Treinos"],
    summary: "Lista de treinos",
    responses: {
      200: {
        description: "Lista de treinos",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Treino",
              },
            },
            example: [
              {
                id: 1,
                nome: "Treino de Peito",
                descricao: "Treino focado em peito e tríceps",
                dificuldade: "Intermediário",
                duracao: 60,
                tipoTreino: "Hipertrofia",
                alunoId: 1,
                createdAt: "2026-08-06T10:00:00.000Z",
                updatedAt: "2026-08-06T10:00:00.000Z",
              },
            ],
          },
        },
      },
      ...prismaErrorResponses,
    },
  },

  post: {
    tags: ["Treinos"],
    summary: "Criar treino",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: [
              "nome",
              "descricao",
              "dificuldade",
              "duracao",
              "tipoTreino",
              "alunoId",
            ],
            properties: {
              nome: {
                type: "string",
                example: "Treino de Peito",
              },
              descricao: {
                type: "string",
                example: "Treino focado em peito e tríceps",
              },
              dificuldade: {
                type: "string",
                example: "Intermediário",
              },
              duracao: {
                type: "integer",
                example: 60,
              },
              tipoTreino: {
                type: "string",
                example: "Hipertrofia",
              },
              alunoId: {
                type: "integer",
                example: 1,
              },
            },
          },
          example: {
            nome: "Treino de Peito",
            descricao: "Treino focado em peito e tríceps",
            dificuldade: "Intermediário",
            duracao: 60,
            tipoTreino: "Hipertrofia",
            alunoId: 1,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Treino criado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Treino",
            },
          },
        },
      },
      ...prismaErrorResponses,
    },
  },
};

const treinosRoutesWithId = {
  get: {
    tags: ["Treinos"],
    summary: "Buscar treino por ID",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID do treino",
        schema: {
          type: "integer",
        },
        example: 1,
      },
    ],
    responses: {
      200: {
        description: "Treino encontrado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Treino",
            },
          },
        },
      },
      ...prismaErrorResponses,
    },
  },

  put: {
    tags: ["Treinos"],
    summary: "Atualizar treino",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID do treino",
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
              nome: {
                type: "string",
                example: "Treino de Peito Atualizado",
              },
              descricao: {
                type: "string",
                example: "Treino atualizado para peito e tríceps",
              },
              dificuldade: {
                type: "string",
                example: "Avançado",
              },
              duracao: {
                type: "integer",
                example: 75,
              },
              tipoTreino: {
                type: "string",
                example: "Hipertrofia",
              },
              alunoId: {
                type: "integer",
                example: 1,
              },
            },
          },
          example: {
            nome: "Treino de Peito Atualizado",
            descricao: "Treino atualizado para peito e tríceps",
            dificuldade: "Avançado",
            duracao: 75,
            tipoTreino: "Hipertrofia",
            alunoId: 1,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Treino atualizado",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Treino",
            },
          },
        },
      },
      ...prismaErrorResponses,
    },
  },

  delete: {
    tags: ["Treinos"],
    summary: "Remover treino",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID do treino",
        schema: {
          type: "integer",
        },
        example: 1,
      },
    ],
    responses: {
      200: {
        description: "Treino removido",
        content: {
          "application/json": {
            schema: {
              type: "string",
            },
            example: "Treino removido com sucesso.",
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
        description: "Lista de funcionários",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: { $ref: "#/components/schemas/Funcionario" },
            },
            example: [
              {
                id: 1,
                nome: "Funcionario 1",
                email: "funcionario@gmail.com",
                idade: 22,
                dataNascimento: "2002-05-26T14:30:00.000Z",
                cpf: 12345678910,
                clt: 1234,
                turno: "manhã",
                cargo: "Gerente",
                createdAt: "2026-08-04T10:00:00.000Z",
                updatedAt: "2026-08-04T10:00:00.000Z",
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
              idade: { type: "integer" },
              dataNascimento: { type: "string", format: "date-time" },
              cpf: { type: "integer" },
              clt: { type: "integer" },
              turno: { type: "string" },
              cargo: { type: "string" },
            },
          },
          example: {
            nome: "Funcionario 1",
            email: "funcionario@gmail.com",
            idade: 22,
            dataNascimento: "2002-05-26T14:30:00.000Z",
            cpf: 12345678910,
            clt: 1234,
            turno: "manhã",
            cargo: "Gerente",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Funcionário criado",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Funcionario" },
          },
        },
      },
      ...prismaErrorResponses,
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
        schema: { type: "integer" },
        example: 1,
      },
    ],
    responses: {
      200: {
        description: "Funcionário encontrado",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Funcionario" },
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
        schema: { type: "integer" },
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
              idade: { type: "integer" },
              dataNascimento: { type: "string", format: "date-time" },
              cpf: { type: "integer" },
              clt: { type: "integer" },
              turno: { type: "string" },
              cargo: { type: "string" },
            },
          },
          example: {
            nome: "Funcionario Atualizado",
            email: "funcionario2@gmail.com",
            idade: 23,
            dataNascimento: "2002-05-26T14:30:00.000Z",
            cpf: 12345678910,
            clt: 1234,
            turno: "tarde",
            cargo: "Supervisor",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Funcionário atualizado",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Funcionario" },
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
        schema: { type: "integer" },
        example: 1,
      },
    ],
    responses: {
      200: {
        description: "Funcionário removido",
        content: {
          "application/json": {
            schema: { type: "string" },
            example: "Funcionário removido com sucesso.",
          },
        },
      },
      ...prismaErrorResponses,
    },
  },
};

const receitasRoutesNoId = {
  get: {
    tags: ["Receitas"],
    summary: "Lista de receitas",
    responses: {
      200: {
        description: "Lista de receitas",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: { $ref: "#/components/schemas/Receita" },
            },
            example: [
              {
                id: 1,
                pagamento: "Mensalidade",
                dataPagamento: "2026-08-04T10:00:00.000Z",
                valorPagamento: "150.00",
                status: "Pago",
                formaPagamento: "Pix",
                createdAt: "2026-08-04T10:00:00.000Z",
                updatedAt: "2026-08-04T10:00:00.000Z",
              },
            ],
          },
        },
      },
      ...prismaErrorResponses,
    },
  },

  post: {
    tags: ["Receitas"],
    summary: "Criar receita",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              pagamento: { type: "string" },
              dataPagamento: { type: "string", format: "date-time" },
              valorPagamento: { type: "string" },
              status: { type: "string" },
              formaPagamento: { type: "string" },
            },
          },
          example: {
            pagamento: "Mensalidade",
            dataPagamento: "2026-08-04T10:00:00.000Z",
            valorPagamento: "150.00",
            status: "Pago",
            formaPagamento: "Pix",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Receita criada",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Receita" },
          },
        },
      },
      ...prismaErrorResponses,
    },
  },
};

const receitasRoutesWithId = {
  get: {
    tags: ["Receitas"],
    summary: "Buscar receita por ID",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID da receita",
        schema: { type: "integer" },
        example: 1,
      },
    ],
    responses: {
      200: {
        description: "Receita encontrada",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Receita" },
          },
        },
      },
      ...prismaErrorResponses,
    },
  },

  put: {
    tags: ["Receitas"],
    summary: "Atualizar receita",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID da receita",
        schema: { type: "integer" },
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
              pagamento: { type: "string" },
              dataPagamento: { type: "string", format: "date-time" },
              valorPagamento: { type: "string" },
              status: { type: "string" },
              formaPagamento: { type: "string" },
            },
          },
          example: {
            pagamento: "Mensalidade atualizada",
            dataPagamento: "2026-08-04T10:00:00.000Z",
            valorPagamento: "180.00",
            status: "Pago",
            formaPagamento: "Cartão",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Receita atualizada",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/Receita" },
          },
        },
      },
      ...prismaErrorResponses,
    },
  },

  delete: {
    tags: ["Receitas"],
    summary: "Remover receita",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID da receita",
        schema: { type: "integer" },
        example: 1,
      },
    ],
    responses: {
      200: {
        description: "Receita removida",
        content: {
          "application/json": {
            schema: { type: "string" },
            example: "Receita removida com sucesso.",
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

  "/funcionarios": funcionariosRoutesNoId,
  "/funcionarios/{id}": funcionariosRoutesWithId,

  "/receitas": receitasRoutesNoId,
  "/receitas/{id}": receitasRoutesWithId,

  "/treinos": treinosRoutesNoId,
  "/treinos/{id}": treinosRoutesWithId,
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
    {
    name: "Treinos",
    description: "CRUD de treinos dos alunos",
    },
    {
      name: "Funcionários",
      description: "CRUD de funcionários",
    },
    {
      name: "Receitas",
      description: "CRUD de receitas",
    },
  ],
  components: {
    schemas: {
    Aluno: alunoSchema,
    Funcionario: funcionarioSchema,
    Receita: receitaSchema,
    Treino: treinoSchema,
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