[![CI](https://github.com/viktor-podzigun/fastify-nodejs-example/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/viktor-podzigun/fastify-nodejs-example/actions/workflows/ci.yml?query=workflow%3Aci+branch%3Amain)
[![Coverage Status](https://coveralls.io/repos/github/viktor-podzigun/fastify-nodejs-example/badge.svg?branch=main)](https://coveralls.io/github/viktor-podzigun/fastify-nodejs-example?branch=main)

# fastify-nodejs-example

Example CRUD API using [Fastify](https://fastify.dev/) Web framework.

## How to build

```bash
npm run lint && npm run test
```

## How to run

Run the app server in dev/refresh mode:

```bash
npm run start:dev
```

Run the app server in production mode:

```bash
npm run start:prod
```

Run the app server in cluster mode:

```bash
npm run start:multi
```

## Accessing the Api

Api is available at the following endpoint (using default port):

```bash
http://127.0.0.1:3000/api
```
