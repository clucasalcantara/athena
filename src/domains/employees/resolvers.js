import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
} from './actions'

export default {
  queries: { getAllEmployees, getEmployeeById },
  mutations: { addEmployee, updateEmployee, deleteEmployee },
}
