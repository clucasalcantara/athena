export const types = `
  type Appointment {
    id: String
    customerId: String
    employeeId: String
    date: String
  }

  input AppointmentInput {
    customerId: String
    employeeId: String
    date: String
  }
`
export const queries = `
  getAppointmentById(id: String): Appointment
  getAllAppointments: [Appointment]
`

export const mutations = `
  bookAppointment(data: AppointmentInput): insertResponse
  cancelAppointment(id: String): removeResponse
  updateAppointment(id: String, data: AppointmentInput): updateResponse
`
