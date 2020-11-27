// Domains
import * as common from '../domains/common'
import * as customers from '../domains/customers'
import * as employees from '../domains/employees'
import * as appointments from '../domains/appointments'
// Helpers
import { generateExecutableSchema } from '../common/helpers/generate-executable-schema'

export const appSchema = generateExecutableSchema([
  common,
  customers,
  employees,
  appointments,
])
