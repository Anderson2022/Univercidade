import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger'

export default {
  uiEnabled: true, //disable or enable swaggerUi route
  uiUrl: 'docs', // url path to swaggerUI
  specEnabled: true, //disable or enable swagger.json route
  specUrl: '/swagger.json',

  middleware: [], // middlewares array, for protect your swagger docs and spec endpoints
  swaggerAuth: {
    authMiddleware: 'swagger-auth',
    authCredentials: {
      login: 'teste1@test.com',
      password: '123456789'
    }
  },

  options: {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Application with Comet Institute docs',
        version: '1.0.0',
        description: ''
      },
      components: {
        securitySchemes: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      security: {
        bearerAuth: [],
      }
    },

    apis: [
      'js/app/**/*.ts',
      'resources/docs/swagger/**/*.yml', // adicionando arquivos JSON
      'start/routes.ts'
    ],
    basePath: '/'
  },
  mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
  specFilePath: 'resources/docs//swagger.json'
} as SwaggerConfig
