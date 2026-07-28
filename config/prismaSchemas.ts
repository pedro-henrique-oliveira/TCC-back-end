export const prismaErrorResponses = {
  400: {
    description: "Erro de validação ou requisição inválida",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Erro",
        },
        examples: {
          P2000: {
            value:
              "The provided value for the column is too long for the column's type.",
          },
          P1012: {
            value: "Argument `{}` is missing.",
          },
          P2012: {
            value: "Missing a required value.",
          },
        },
      },
    },
  },

  401: {
    description: "Falha de autenticação",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Erro",
        },
        example: "Não autenticado.",
      },
    },
  },

  403: {
    description: "Acesso negado",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Erro",
        },
        examples: {
          P1010: {
            value: "User was denied access on the database.",
          },
          P3004: {
            value:
              "The database is a system database and should not be altered.",
          },
        },
      },
    },
  },

  404: {
    description: "Recurso não encontrado",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Erro",
        },
        examples: {
          P2001: {
            value:
              "The record searched for in the where condition does not exist.",
          },
          P3015: {
            value: "Could not find the migration file.",
          },
        },
      },
    },
  },

  409: {
    description: "Conflito de dados",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Erro",
        },
        examples: {
          P2002: {
            value: "Unique constraint failed on the constraint.",
          },
          P2003: {
            value: "Foreign key constraint failed.",
          },
          P2034: {
            value: "Transaction failed due to a write conflict or deadlock.",
          },
        },
      },
    },
  },

  413: {
    description: "Payload muito grande",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Erro",
        },
        example: "Response size limit exceeded.",
      },
    },
  },

  429: {
    description: "Muitas requisições",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Erro",
        },
        example: "Too many requests.",
      },
    },
  },

  500: {
    description: "Erro interno do servidor",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Erro",
        },
        examples: {
          P2010: {
            value: "Raw query failed.",
          },
          P2035: {
            value: "Assertion violation on the database.",
          },
        },
      },
    },
  },

  502: {
    description: "Erro de comunicação",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Erro",
        },
        example: "Error opening a TLS connection.",
      },
    },
  },

  503: {
    description: "Serviço indisponível",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Erro",
        },
        examples: {
          P1001: {
            value: "Can't reach database server.",
          },
          P1017: {
            value: "Server has closed the connection.",
          },
        },
      },
    },
  },

  504: {
    description: "Timeout",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/Erro",
        },
        examples: {
          P1002: {
            value: "The database server was reached but timed out.",
          },
          P1008: {
            value: "Operations timed out.",
          },
        },
      },
    },
  },
};