import {
  bookAppointment,
  updateAppointment,
  cancelAppointment,
  getAllAppointments,
  getAppointmentById,
} from './actions'

export default {
  queries: { getAllAppointments, getAppointmentById },
  mutations: { bookAppointment, updateAppointment, cancelAppointment },
}
