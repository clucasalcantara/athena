/* eslint-disable camelcase */
import logger from 'hoopa-logger'
import { data } from 'rethinkly'
import { rethinkly } from '../../services'

/**
 * Insert a employee
 * This function is a resolver used by the graphql backend
 * Responsible to input a user based on a GQL payload
 * @param {*} _ GQL Response status and default body
 * @param {Object} configParams
 * @return {Object} response
 */
export const addEmployee = async (_, { data: values }) => {
  logger.info(`Inserting employee with payload: ${JSON.stringify(values)}...`)

  const conn = await rethinkly()
  const { generated_keys = [] } = await data.insert(conn, 'employees', values)

  if (generated_keys.length === 0) {
    logger.error(`Error inserting --data: ${JSON.stringify(values)}`)

    return {
      success: false,
      generated_id: null,
    }
  }

  logger.info(`Employee inserted with id ${generated_keys[0]}...`)
  return { success: true, generated_id: generated_keys[0] }
}

/**
 * Delete a employee
 * This function is a resolver used by the graphql backend
 * Responsible to delete a employee based on a id
 * @param {*} _ GQL Response status and default body
 * @param {String} id
 * @return {Object} response
 */
export const deleteEmployee = async (_, { id }) => {
  logger.info(`Started employee ${JSON.stringify(id)} removal...`)

  const conn = await rethinkly()
  const { errors } = await data.remove(conn, 'employees', id)

  if (errors) {
    logger.error(`Error deleting employee with --id: ${id}`)

    return {
      success: false,
      removed_id: null,
    }
  }

  return { success: true, removed_id: id }
}

/**
 * Updates a employee
 * This function is a resolver used by the graphql backend
 * Responsible to update a employee based on a id
 * @param {*} _ GQL Response status and default body
 * @param {String} id
 * @param {Object} values
 * @return {Object} response
 */
export const updateEmployee = async (_, { id, data: values }) => {
  logger.info(`Updating employee ${JSON.stringify(id)}...`)

  const conn = await rethinkly()
  const result = await data.get(conn, 'employees', id)

  if (result) {
    const { errors } = await data.update(conn, 'employees', id, values)

    if (errors) {
      logger.error(
        `Error updating employee with --id: ${id} ${JSON.stringify(errors)}`
      )

      return {
        success: false,
        updated: false,
      }
    }

    return {
      success: true,
      updated_id: id,
    }
  }
}

/**
 * Get all employees
 * This function is a resolver used by the graphql backend
 * Responsible to retrieve all saved trips
 * @param {*} _ GQL Response status and default body
 * @param {Object} configParams
 * @return {Promise} retrieveData response
 */
export const getAllEmployees = async () => {
  logger.info('Getting all employees...')

  const conn = await rethinkly()
  const employees = await data.get(conn, 'employees')

  return employees
}

/**
 * Get a employee
 * This function is a resolver used by the graphql backend
 * Responsible to retrieve a GQL payload response based on
 * a query by id
 * @param {*} _ GQL Response status and default body
 * @param {Object } configParams
 * @return {Object} employee
 */
export const getEmployeeById = async (_, { id }) => {
  logger.info(`Getting employee with --id: ${id}`)

  const conn = await rethinkly()
  const result = await data.get(conn, 'employees', { id })

  logger.info('Here is the employee:', JSON.stringify(result))

  return result
}
/* eslint-enable camelcase */
