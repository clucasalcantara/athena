import {
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getAll,
  getCustomerById,
} from './actions'

export default {
  queries: { getAll, getCustomerById },
  mutations: { addCustomer, updateCustomer, deleteCustomer },
}
