// Domains
import { schema } from '../../../domains/customers'

import { generateSchema } from '.'

describe('GQL Schema generation', () => {
  it('should mount a schema with the configured domains', () => {
    const result = generateSchema([schema])
    expect(result).toMatchSnapshot()
  })
})
