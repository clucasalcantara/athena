export const types = `
  type Customer {
    id: String
    name: String
    phone: String
    email: String
  }

  input CustomerInput {
    name: String
    phone: String
    email: String
  }
`

export const queries = `
  getCustomerById(id: String): Customer
  getAll: [Customer]
`

export const mutations = `
  addCustomer(data: CustomerInput): insertResponse
  deleteCustomer(id: String): removeResponse
  updateCustomer(id: String, data: CustomerInput): updateResponse
`
