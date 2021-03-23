import {
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
} from './actions'

export default {
  queries: { getAllCustomers, getCustomerById },
  mutations: { addCustomer, updateCustomer, deleteCustomer },
}
