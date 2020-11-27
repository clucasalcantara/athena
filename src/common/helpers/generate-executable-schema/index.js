import { makeExecutableSchema } from 'graphql-tools'
// Helpers
import { generateSchema } from '../generate-schema'

export const generateExecutableSchema = domains => {
  const schemas = domains.map(({ schema }) => schema)

  const queries = domains.reduce((result, domain) => {
    result = {
      ...result,
      ...domain.resolvers.queries,
    }

    return result
  }, {})

  const mutations = domains.reduce((result, domain) => {
    result = {
      ...result,
      ...domain.resolvers.mutations,
    }

    return result
  }, {})

  return makeExecutableSchema({
    typeDefs: generateSchema(schemas),
    resolvers: {
      Query: {
        ...queries,
      },
      Mutation: {
        ...mutations,
      },
    },
  })
}
