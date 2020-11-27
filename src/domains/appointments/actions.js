/* eslint-disable camelcase */
import logger from 'hoopa-logger'
import { data } from 'rethinkly'
import { rethinkly } from '../../services'

/**
 * Book an appointment
 * This function is a resolver used by the graphql backend
 * Responsible to input a user based on a GQL payload
 * @param {*} _ GQL Response status and default body
 * @param {Object} configParams
 * @return {Object} response
 */
export const bookAppointment = async (_, { data: values }) => {
  logger.info(
    `Booking an appointment with payload: ${JSON.stringify(values)}...`
  )

  const conn = await rethinkly()
  const { generated_keys = [] } = await data.insert(
    conn,
    'appointments',
    values
  )

  if (generated_keys.length === 0) {
    logger.error(`Error inserting --data: ${JSON.stringify(values)}`)

    return {
      success: false,
      generated_id: null,
    }
  }

  logger.info(`Booking created with id ${generated_keys[0]}...`)
  return { success: true, generated_id: generated_keys[0] }
}

/**
 * Delete an appointment
 * This function is a resolver used by the graphql backend
 * Responsible to delete a employee based on a id
 * @param {*} _ GQL Response status and default body
 * @param {String} id
 * @return {Object} response
 */
export const cancelAppointment = async (_, { id }) => {
  logger.info(`Started appointment ${JSON.stringify(id)} cancelation...`)

  const conn = await rethinkly()
  const { errors } = await data.remove(conn, 'appointments', id)

  if (errors) {
    logger.error(`Error deleting appointment with --id: ${id}`)

    return {
      success: false,
      removed_id: null,
    }
  }

  return { success: true, removed_id: id }
}

/**
 * Updates an appointment
 * This function is a resolver used by the graphql backend
 * Responsible to update a employee based on a id
 * @param {*} _ GQL Response status and default body
 * @param {String} id
 * @param {Object} values
 * @return {Object} response
 */
export const updateAppointment = async (_, { id, data: values }) => {
  logger.info(`Updating appointment ${JSON.stringify(id)}...`)

  const conn = await rethinkly()
  const result = await data.get(conn, 'appointments', id)

  if (result) {
    const { errors } = await data.update(conn, 'appointments', id, values)

    if (errors) {
      logger.error(
        `Error updating appointment with --id: ${id} ${JSON.stringify(errors)}`
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
 * Get all appointments
 * This function is a resolver used by the graphql backend
 * Responsible to retrieve all saved trips
 * @param {*} _ GQL Response status and default body
 * @param {Object} configParams
 * @return {Promise} retrieveData response
 */
export const getAllAppointments = async () => {
  logger.info('Getting all appointments...')

  const conn = await rethinkly()
  const appointments = await data.get(conn, 'appointments')

  return appointments
}

/**
 * Get an ppointment
 * This function is a resolver used by the graphql backend
 * Responsible to retrieve a GQL payload response based on
 * a query by id
 * @param {*} _ GQL Response status and default body
 * @param {Object } configParams
 * @return {Object} employee
 */
export const getAppointmentById = async (_, { id }) => {
  logger.info(`Getting appointment with --id: ${id}`)

  const conn = await rethinkly()
  const result = await data.get(conn, 'appointments', { id })

  logger.info('Here is the appointment:', JSON.stringify(result))

  return result
}
/* eslint-enable camelcase */
