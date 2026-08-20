import packageJson from "../package.json";
import { prismaErrorResponses } from "./prismaSchemas.js";

/* =========================================================
   SCHEMAS
========================================================= */

const alunoSchema = {
  type: "object",
  properties: {
    id: { type: "integer", example: 1 },
    nome: { type: "string", example: "Alexandre" },
    email: { type: "string", format: "email", example: "alexandre@gmail.com" },
    cpf: { type: "string", example: "12345678987" },
    senha: {
      type: "string",
      example: "********",
      description: "Senha do aluno",
    },
    plano: { type: "string", example: "Premium" },
    idade: { type: "integer", example: 18 },
    dataNascimento: {
      type: "string",
      format: "date-time",
      example: "2008-05-04T11:29:00.588Z",
    },
    ultimoAcesso: {
      type: "string",
      format: "date-time",
      nullable: true,
    },
    funcionarioId: {
      type: "integer",
      nullable: true,
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

const treinoSchema = {
  type: "object",
  properties: {
    id: { type: "integer", example: 1 },

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

const funcionarioSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      example: 1,
    },

    nome: {
      type: "string",
      example: "Carlos Silva",
    },

    adm: {
      type: "boolean",
      example: false,
      description: "Indica se o funcionário é administrador",
    },

    email: {
      type: "string",
      format: "email",
      example: "carlos@gymflow.com",
    },

    idade: {
      type: "integer",
      example: 22,
    },

    dataNascimento: {
      type: "string",
      format: "date-time",
      example: "2002-05-26T14:30:00.000Z",
    },

    cpf: {
      type: "string",
      example: "12345678910",
    },

    clt: {
      type: "string",
      example: "1234",
    },

    turno: {
      type: "string",
      example: "manhã",
    },

    cargo: {
      type: "string",
      example: "Gerente",
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

const receitaSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      example: 1,
    },

    pagamento: {
      type: "string",
      example: "Mensalidade",
    },

    dataPagamento: {
      type: "string",
      format: "date-time",
      example: "2026-08-04T10:00:00.000Z",
    },

    valorPagamento: {
      type: "string",
      example: "150.00",
    },

    status: {
      type: "string",
      example: "Pago",
    },

    formaPagamento: {
      type: "string",
      example: "Pix",
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

const despesaSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      example: 1,
    },

    descricao: {
      type: "string",
      example: "Conta de energia",
    },

    valor: {
      type: "number",
      format: "float",
      example: 350.5,
    },

    categoria: {
      type: "string",
      example: "LUZ",
      enum: [
        "LUZ",
        "AGUA",
        "INTERNET",
        "MANUTENCAO",
        "OUTROS",
      ],
    },

    dataVencimento: {
      type: "string",
      format: "date-time",
      example: "2026-08-10T00:00:00.000Z",
    },

    dataPagamento: {
      type: "string",
      format: "date-time",
      nullable: true,
      example: "2026-08-09T00:00:00.000Z",
    },

    status: {
      type: "string",
      example: "PAGO",
      enum: ["PAGO", "PENDENTE"],
    },
  },
};

const presencaSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      example: 1,
    },

    alunoId: {
      type: "integer",
      example: 1,
    },

    dataHora: {
      type: "string",
      format: "date-time",
      example: "2026-08-20T08:30:00.000Z",
    },
  },
};

const erroSchema = {
  type: "string",
  example: "Unique constraint failed on the constraint.",
};

const loginResponseSchema = {
  type: "object",
  properties: {
    success: {
      type: "boolean",
      example: true,
    },

    token: {
      type: "string",
      example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    },

    user: {
      type: "object",
      properties: {
        id: {
          type: "integer",
          example: 1,
        },

        nome: {
          type: "string",
          example: "Carlos Silva",
        },

        email: {
          type: "string",
          example: "admin@gymflow.com",
        },

        cargo: {
          type: "string",
          example: "Gerente",
        },

        adm: {
          type: "boolean",
          example: true,
        },
      },
    },
  },
};

/* =========================================================
   ROTA INICIAL
========================================================= */

const initialRoute = {
  get: {
    security: [],
    tags: ["Rota Inicial"],
    summary: "Verificar funcionamento da API",

    responses: {
      200: {
        description: "API funcionando",

        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                  example: true,
                },
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
};

/* =========================================================
   LOGIN
========================================================= */

const loginRoute = {
  post: {
    security: [],
    tags: ["Autenticação"],
    summary: "Realizar login",
    description:
      "Autentica um aluno ou funcionário e retorna um token JWT.",

    requestBody: {
      required: true,

      content: {
        "application/json": {
          schema: {
            type: "object",

            required: ["email", "senha"],

            properties: {
              email: {
                type: "string",
                format: "email",
                example: "admin@gymflow.com",
              },

              senha: {
                type: "string",
                format: "password",
                example: "123456",
              },
            },
          },

          example: {
            email: "admin@gymflow.com",
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
              $ref: "#/components/schemas/LoginResponse",
            },

            example: {
              success: true,
              token: "eyJhbGciOiJIUzI1NiIs...",
              user: {
                id: 1,
                nome: "Carlos Silva",
                email: "admin@gymflow.com",
                cargo: "Gerente",
                adm: true,
              },
            },
          },
        },
      },

      ...prismaErrorResponses,
    },
  },
};

/* =========================================================
   SOLICITAR PLANO
========================================================= */

const solicitarPlanoRoute = {
  post: {
    security: [],
    tags: ["Planos"],
    summary: "Solicitar plano",
    description:
      "Realiza uma solicitação pública de assinatura de plano.",

    requestBody: {
      required: true,

      content: {
        "application/json": {
          schema: {
            type: "object",

            properties: {
              nome: {
                type: "string",
                example: "Pedro Henrique",
              },

              email: {
                type: "string",
                format: "email",
                example: "pedro@gmail.com",
              },

              plano: {
                type: "string",
                example: "Premium",
              },
            },
          },

          example: {
            nome: "Pedro Henrique",
            email: "pedro@gmail.com",
            plano: "Premium",
          },
        },
      },
    },

    responses: {
      201: {
        description: "Solicitação realizada com sucesso",

        content: {
          "application/json": {
            schema: {
              type: "object",
            },
          },
        },
      },

      ...prismaErrorResponses,
    },
  },
};

/* =========================================================
   ALUNOS
========================================================= */

const alunosRoutesNoId = {
  get: {
    tags: ["Alunos"],
    summary: "Lista de alunos",

    responses: {
      200: {
        description: "Lista de alunos",

        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Aluno",
              },
            },
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

            required: [
              "nome",
              "email",
              "cpf",
              "plano",
            ],

            properties: {
              nome: {
                type: "string",
                example: "Alexandre",
              },

              email: {
                type: "string",
                format: "email",
                example: "alexandre@gmail.com",
              },

              cpf: {
                type: "string",
                example: "12345678987",
              },

              senha: {
                type: "string",
                format: "password",
                example: "123456",
              },

              plano: {
                type: "string",
                example: "Premium",
              },

              idade: {
                type: "integer",
                example: 18,
              },

              dataNascimento: {
                type: "string",
                format: "date-time",
              },
            },
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
              $ref: "#/components/schemas/Aluno",
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
              email: {
                type: "string",
                format: "email",
              },
              cpf: { type: "string" },
              plano: { type: "string" },
              idade: { type: "integer" },
              dataNascimento: {
                type: "string",
                format: "date-time",
              },
            },
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

/* =========================================================
   TREINOS
========================================================= */

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
                example:
                  "Treino focado em peito e tríceps",
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
              descricao: { type: "string" },
              dificuldade: { type: "string" },
              duracao: { type: "integer" },
              tipoTreino: { type: "string" },
              alunoId: { type: "integer" },
            },
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

/* =========================================================
   FUNCIONÁRIOS
========================================================= */

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

              items: {
                $ref: "#/components/schemas/Funcionario",
              },
            },
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

            required: [
              "nome",
              "email",
              "senha",
              "cpf",
              "clt",
              "turno",
              "cargo",
            ],

            properties: {
              nome: {
                type: "string",
                example: "Carlos Silva",
              },

              email: {
                type: "string",
                format: "email",
                example: "carlos@gymflow.com",
              },

              senha: {
                type: "string",
                format: "password",
                example: "123456",
              },

              adm: {
                type: "boolean",
                example: false,
              },

              idade: {
                type: "integer",
                example: 22,
              },

              dataNascimento: {
                type: "string",
                format: "date-time",
              },

              cpf: {
                type: "string",
                example: "12345678910",
              },

              clt: {
                type: "string",
                example: "1234",
              },

              turno: {
                type: "string",
                example: "manhã",
              },

              cargo: {
                type: "string",
                example: "Professor",
              },
            },
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

              email: {
                type: "string",
                format: "email",
              },

              senha: {
                type: "string",
              },

              adm: {
                type: "boolean",
              },

              idade: {
                type: "integer",
              },

              dataNascimento: {
                type: "string",
                format: "date-time",
              },

              cpf: {
                type: "string",
              },

              clt: {
                type: "string",
              },

              turno: {
                type: "string",
              },

              cargo: {
                type: "string",
              },
            },
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

            example:
              "Funcionário removido com sucesso.",
          },
        },
      },

      ...prismaErrorResponses,
    },
  },
};

/* =========================================================
   RECEITAS
========================================================= */

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

              items: {
                $ref: "#/components/schemas/Receita",
              },
            },
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

            required: [
              "pagamento",
              "dataPagamento",
              "valorPagamento",
              "status",
              "formaPagamento",
            ],

            properties: {
              pagamento: {
                type: "string",
                example: "Mensalidade",
              },

              dataPagamento: {
                type: "string",
                format: "date-time",
              },

              valorPagamento: {
                type: "string",
                example: "150.00",
              },

              status: {
                type: "string",
                example: "Pago",
              },

              formaPagamento: {
                type: "string",
                example: "Pix",
              },
            },
          },
        },
      },
    },

    responses: {
      201: {
        description: "Receita criada",

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Receita",
            },
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
        schema: {
          type: "integer",
        },
        example: 1,
      },
    ],

    responses: {
      200: {
        description: "Receita encontrada",

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Receita",
            },
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
              pagamento: { type: "string" },

              dataPagamento: {
                type: "string",
                format: "date-time",
              },

              valorPagamento: {
                type: "string",
              },

              status: {
                type: "string",
              },

              formaPagamento: {
                type: "string",
              },
            },
          },
        },
      },
    },

    responses: {
      200: {
        description: "Receita atualizada",

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Receita",
            },
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
        schema: {
          type: "integer",
        },
        example: 1,
      },
    ],

    responses: {
      200: {
        description: "Receita removida",

        content: {
          "application/json": {
            schema: {
              type: "string",
            },

            example:
              "Receita removida com sucesso.",
          },
        },
      },

      ...prismaErrorResponses,
    },
  },
};

/* =========================================================
   DESPESAS
========================================================= */

const despesasRoutesNoId = {
  get: {
    tags: ["Despesas"],
    summary: "Lista de despesas",

    responses: {
      200: {
        description: "Lista de despesas",

        content: {
          "application/json": {
            schema: {
              type: "array",

              items: {
                $ref: "#/components/schemas/Despesa",
              },
            },
          },
        },
      },

      ...prismaErrorResponses,
    },
  },

  post: {
    tags: ["Despesas"],
    summary: "Criar despesa",

    requestBody: {
      required: true,

      content: {
        "application/json": {
          schema: {
            type: "object",

            required: [
              "descricao",
              "valor",
              "categoria",
              "dataVencimento",
              "status",
            ],

            properties: {
              descricao: {
                type: "string",
                example: "Conta de energia",
              },

              valor: {
                type: "number",
                format: "float",
                example: 350.5,
              },

              categoria: {
                type: "string",
                example: "LUZ",
              },

              dataVencimento: {
                type: "string",
                format: "date-time",
              },

              dataPagamento: {
                type: "string",
                format: "date-time",
                nullable: true,
              },

              status: {
                type: "string",
                example: "PENDENTE",
              },
            },
          },
        },
      },
    },

    responses: {
      201: {
        description: "Despesa criada",

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Despesa",
            },
          },
        },
      },

      ...prismaErrorResponses,
    },
  },
};

const despesasSummaryRoute = {
  get: {
    tags: ["Despesas"],
    summary: "Resumo das despesas",

    responses: {
      200: {
        description:
          "Resumo e totais financeiros das despesas por categoria",

        content: {
          "application/json": {
            schema: {
              type: "object",
            },
          },
        },
      },

      ...prismaErrorResponses,
    },
  },
};

const despesasRoutesWithId = {
  put: {
    tags: ["Despesas"],
    summary: "Atualizar despesa",

    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
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
            $ref: "#/components/schemas/Despesa",
          },
        },
      },
    },

    responses: {
      200: {
        description: "Despesa atualizada",

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Despesa",
            },
          },
        },
      },

      ...prismaErrorResponses,
    },
  },

  delete: {
    tags: ["Despesas"],
    summary: "Remover despesa",

    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "integer",
        },
        example: 1,
      },
    ],

    responses: {
      200: {
        description: "Despesa removida",

        content: {
          "application/json": {
            schema: {
              type: "string",
            },

            example:
              "Despesa removida com sucesso.",
          },
        },
      },

      ...prismaErrorResponses,
    },
  },
};

/* =========================================================
   PRESENÇAS
========================================================= */

const presencasRoute = {
  post: {
    tags: ["Presenças"],
    summary: "Registrar presença",

    requestBody: {
      required: true,

      content: {
        "application/json": {
          schema: {
            type: "object",

            required: ["alunoId"],

            properties: {
              alunoId: {
                type: "integer",
                example: 1,
              },
            },
          },

          example: {
            alunoId: 1,
          },
        },
      },
    },

    responses: {
      201: {
        description: "Presença registrada",

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Presenca",
            },
          },
        },
      },

      ...prismaErrorResponses,
    },
  },
};

const presencasHojeRoute = {
  get: {
    tags: ["Presenças"],
    summary: "Listar presenças de hoje",

    responses: {
      200: {
        description:
          "Lista de acessos registrados no dia atual",

        content: {
          "application/json": {
            schema: {
              type: "array",

              items: {
                $ref: "#/components/schemas/Presenca",
              },
            },
          },
        },
      },

      ...prismaErrorResponses,
    },
  },
};

/* =========================================================
   MATRÍCULA
========================================================= */

const matricularRoute = {
  post: {
    tags: ["Matrículas"],
    summary: "Matricular aluno",

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
        description: "Aluno matriculado",

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Aluno",
            },
          },
        },
      },

      ...prismaErrorResponses,
    },
  },
};

const desmatricularRoute = {
  delete: {
    tags: ["Matrículas"],
    summary: "Desmatricular aluno",

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
        description: "Aluno desmatriculado",

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Aluno",
            },
          },
        },
      },

      ...prismaErrorResponses,
    },
  },
};

/* =========================================================
   SWAGGER CONFIG
========================================================= */

export default {
  openapi: "3.2.0",

  info: {
    title: packageJson.name,
    version: packageJson.version,
    description:
      "Documentação da API REST do sistema GymFlow para gerenciamento de academias.",
  },

  servers: [
    {
      url: "http://localhost:8080",
      description: "Servidor local",
    },
  ],

  paths: {
    "/": initialRoute,

    "/login": loginRoute,

    "/solicitar-plano": solicitarPlanoRoute,

    "/alunos": alunosRoutesNoId,

    "/alunos/{id}": alunosRoutesWithId,

    "/treinos": treinosRoutesNoId,

    "/treinos/{id}": treinosRoutesWithId,

    "/funcionarios": funcionariosRoutesNoId,

    "/funcionarios/{id}": funcionariosRoutesWithId,

    "/receitas": receitasRoutesNoId,

    "/receitas/{id}": receitasRoutesWithId,

    "/despesas": despesasRoutesNoId,

    "/despesas/summary": despesasSummaryRoute,

    "/despesas/{id}": despesasRoutesWithId,

    "/presencas": presencasRoute,

    "/presencas/hoje": presencasHojeRoute,

    "/matricular/{id}": matricularRoute,

    "/desmatricular/{id}": desmatricularRoute,
  },

  tags: [
    {
      name: "Rota Inicial",
      description: "Verificação da API",
    },

    {
      name: "Autenticação",
      description: "Login e autenticação dos usuários",
    },

    {
      name: "Planos",
      description: "Solicitação de planos",
    },

    {
      name: "Alunos",
      description: "CRUD de alunos",
    },

    {
      name: "Treinos",
      description: "CRUD de treinos",
    },

    {
      name: "Funcionários",
      description: "CRUD de funcionários e administradores",
    },

    {
      name: "Receitas",
      description: "Controle de receitas e pagamentos",
    },

    {
      name: "Despesas",
      description: "Controle de despesas da academia",
    },

    {
      name: "Presenças",
      description: "Controle de acessos e presenças dos alunos",
    },

    {
      name: "Matrículas",
      description: "Controle de matrícula dos alunos",
    },
  ],

  components: {
    schemas: {
      Aluno: alunoSchema,
      Funcionario: funcionarioSchema,
      Receita: receitaSchema,
      Treino: treinoSchema,
      Despesa: despesaSchema,
      Presenca: presencaSchema,
      LoginResponse: loginResponseSchema,
      Erro: erroSchema,
    },

    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description:
          "Informe o token JWT retornado pelo endpoint /login.",
      },
    },
  },

  security: [
    {
      bearerAuth: [],
    },
  ],
};