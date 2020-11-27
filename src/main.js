/**
 * Server instance
 * @memberof @livup/athena
 */
import Koa from 'koa'
import cors from 'koa2-cors'
import { ApolloServer } from 'apollo-server-koa'
import logger from 'hoopa-logger'
// GraphQL Definitions
import { appSchema as schema } from './graphql'

const Server = new ApolloServer({ schema })
const Athena = new Koa()

const port = process.env.PORT || 4005
const { graphqlPath } = Server

Athena.use(cors())
Server.applyMiddleware({ app: Athena })

Athena.listen({ port }, () =>
  logger.info(`🚀 Athena running at http://localhost:${port}${graphqlPath}`)
)
