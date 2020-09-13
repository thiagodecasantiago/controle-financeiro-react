export const swaggerDocument = {
  swagger: '2.0',
  info: {
    description:
      "This is the API docs for the application 'Controle Financeiro Pessoal'.",
    version: '1.0.0',
    title: 'Controle Financeiro Pessoal',
    contact: {
      name: 'Thiago Santiago',
      url: 'https://github.com/thiagodecasantiago',
    },
  },
  host: 'tds-desafio-final.herokuapp.com',
  basePath: '/api',
  tags: [
    {
      name: 'transaction',
      description: 'Operations on transactions',
    },
  ],
  schemes: ['https', 'http'],
  paths: {
    '/transaction/periods': {
      get: {
        tags: ['transaction'],
        summary: 'Retrieves list of available periods',
        operationId: 'retrievePeriods',
        produces: ['application/json'],
        parameters: [],
        responses: {
          default: {
            description: 'Successful operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Period',
              },
              example: ['2020-08', '2020-09', '2020-10'],
            },
          },
        },
      },
    },
    '/transaction': {
      get: {
        tags: ['transaction'],
        summary: 'Retrieves transactions of given period',
        operationId: 'retrieveTransactions',
        produces: ['application/json'],
        parameters: [
          {
            in: 'query',
            name: 'period',
            required: true,
            type: 'string',
            description: 'Exemplo: 2020-09',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Transaction',
              },
            },
          },
          400: {
            description: 'Empty value',
          },
        },
      },
      post: {
        tags: ['transaction'],
        summary: 'Add a new transaction',
        operationId: 'createTransaction',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'Transaction',
            description:
              "Transaction object that needs to be added to the server.\n\n Please don't send an id on post. ID field WILL BE ignored.",
            required: true,
            schema: {
              $ref: '#/definitions/Transaction',
            },
          },
        ],
        responses: {
          201: {
            description: 'Successful operation',
            schema: {
              $ref: '#/definitions/Transaction',
            },
          },
        },
      },
    },
    '/transaction/{id}': {
      put: {
        tags: ['transaction'],
        summary: 'Update an existing transaction',
        description: '',
        operationId: 'updateTransaction',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'ID of transaction object',
            required: true,
            type: 'string',
            format: 'byte',
          },
          {
            in: 'body',
            name: 'transaction',
            description: 'Transaction object that needs to be updated',
            required: true,
            schema: {
              $ref: '#/definitions/Transaction',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful operation. Returns updated object.',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Transaction',
              },
            },
          },
          400: {
            description: 'Empty body',
          },
        },
      },
      delete: {
        tags: ['transaction'],
        summary: 'Deletes a transaction',
        description: '',
        operationId: 'deleteTransaction',
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            description: 'ID of transaction object',
            required: true,
            type: 'string',
            format: 'byte',
          },
        ],
        responses: {
          200: {
            description: 'Successful operation.',
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Transaction removida com sucesso.',
                  default: 'Transaction removida com sucesso.',
                },
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    Period: {
      type: 'string',
      format: 'YYYY-MM',
      example: '2020-09',
    },
    Transaction: {
      type: 'object',
      required: ['description', 'value', 'category', 'year', 'month', 'day'],
      properties: {
        id: {
          type: 'string',
          format: 'byte',
        },
        description: {
          type: 'string',
          example: 'Viagem para a praia',
        },
        value: {
          type: 'number',
          example: 100.01,
        },
        category: {
          type: 'string',
          example: 'Lazer',
        },
        year: {
          type: 'integer',
          example: 2020,
        },
        month: {
          type: 'integer',
          example: '09',
          minimum: 1,
          maximum: 12,
        },
        day: {
          type: 'integer',
          example: 7,
          minimum: 1,
          maximum: 31,
        },
        yearMonth: {
          type: 'string',
          $ref: '#/definitions/Period',
        },
        yearMonthDay: {
          type: 'string',
          example: '2020-09-07',
        },
        type: {
          type: 'string',
          enum: ['-', '+'],
        },
      },
    },
  },
  externalDocs: {
    description: 'Find out more about Swagger',
    url: 'http://swagger.io',
  },
};
