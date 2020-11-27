export const types = `
  type Employee {
    id: String
    name: String
    phone: String
    email: String
  }

  input EmployeeInput {
    name: String
    phone: String
    email: String
  }
`
export const queries = `
  getEmployeeById(id: String): Employee
  getAllEmployees: [Employee]
`

export const mutations = `
  addEmployee(data: EmployeeInput): insertResponse
  deleteEmployee(id: String): removeResponse
  updateEmployee(id: String, data: EmployeeInput): updateResponse
`
