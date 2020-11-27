import logger from 'hoopa-logger'
import { gql } from 'apollo-server-koa'

const generateTypes = domains => {
  logger.info('Generating types...')

  return domains.map(domain => domain.types).join('')
}

const generateQueries = domains => {
  logger.info('Generating queries...')

  return domains.map(domain => domain.queries).join('')
}

const generateMutations = domains => {
  logger.info('Generating mutations...')

  return domains.map(domain => domain.mutations).join('')
}

export const generateSchema = domains => gql`
  ${generateTypes(domains)}

  type Query {
    ${generateQueries(domains)}
  }

  type Mutation {
    ${generateMutations(domains)}
  }
`
