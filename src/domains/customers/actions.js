/* eslint-disable camelcase */
import logger from 'hoopa-logger'
import { data } from 'rethinkly'
import { rethinkly } from '../../services'

/**
 * Insert a customer
 * This function is a resolver used by the graphql backend
 * Responsible to input a user based on a GQL payload
 * @param {*} _ GQL Response status and default body
 * @param {Object} configParams
 * @return {Object} response
 */
export const addCustomer = async (_, { data: values }) => {
  logger.info(`Inserting customer with payload: ${JSON.stringify(values)}...`)

  const conn = await rethinkly()
  const { generated_keys = [] } = await data.insert(conn, 'customers', values)

  if (generated_keys.length === 0) {
    logger.error(`Error inserting --data: ${JSON.stringify(values)}`)

    return {
      success: false,
      generated_id: null,
    }
  }

  logger.info(`Customer inserted with id ${generated_keys[0]}...`)
  return { success: true, generated_id: generated_keys[0] }
}

/**
 * Delete a customer
 * This function is a resolver used by the graphql backend
 * Responsible to delete a customer based on a id
 * @param {*} _ GQL Response status and default body
 * @param {String} id
 * @return {Object} response
 */
export const deleteCustomer = async (_, { id }) => {
  logger.info(`Started customer ${JSON.stringify(id)} removal...`)

  const conn = await rethinkly()
  const { errors } = await data.remove(conn, 'customers', id)

  if (errors) {
    logger.error(`Error deleting customer with --id: ${id}`)

    return {
      success: false,
      removed_id: null,
    }
  }

  return { success: true, removed_id: id }
}

/**
 * Updates a customer
 * This function is a resolver used by the graphql backend
 * Responsible to update a customer based on a id
 * @param {*} _ GQL Response status and default body
 * @param {String} id
 * @param {Object} values
 * @return {Object} response
 */
export const updateCustomer = async (_, { id, data: values }) => {
  logger.info(`Updating customer ${JSON.stringify(id)}...`)

  const conn = await rethinkly()
  const result = await data.get(conn, 'customers', id)

  if (result) {
    const { errors } = await data.update(conn, 'customers', id, values)

    if (errors) {
      logger.error(
        `Error updating customer with --id: ${id} ${JSON.stringify(errors)}`
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
 * Get all customers
 * This function is a resolver used by the graphql backend
 * Responsible to retrieve all saved trips
 * @param {*} _ GQL Response status and default body
 * @param {Object} configParams
 * @return {Promise} retrieveData response
 */
export const getAllCustomers = async () => {
  logger.info('Getting all customers...')

  const conn = await rethinkly()
  const customers = await data.get(conn, 'customers')

  return customers
}

/**
 * Get a customer
 * This function is a resolver used by the graphql backend
 * Responsible to retrieve a GQL payload response based on
 * a query by id
 * @param {*} _ GQL Response status and default body
 * @param {Object } configParams
 * @return {Object} Customer
 */
export const getCustomerById = async (_, { id }) => {
  logger.info(`Getting customer with --id: ${id}`)

  const conn = await rethinkly()
  const result = await data.get(conn, 'customers', { id })

  logger.info('Here is the customer:', JSON.stringify(result))

  return result
}
/* eslint-enable camelcase */
