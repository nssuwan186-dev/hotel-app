import { Customer } from '../models/customer';

let customers: Customer[] = [];

export function addCustomer(customer: Customer) {
  customers.push(customer);
}

export function getCustomers() {
  return customers;
}

export function getCustomerById(id: string) {
  return customers.find(c => c.id === id);
}