import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface'
import {InputListCustomerDTO, OutputListCustomerDTO} from './list.customer.dto'
import Customer from '../../../domain/customer/entity/customer'

export default class ListCustomerUseCase {

  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute (input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
    const customers = await this.customerRepository.findAll()
    return OutputMapper.toOutput(customers)
  }

}

class OutputMapper {
  static toOutput(customers: Customer[]): OutputListCustomerDTO {
    return {
      customers: customers.map(customer => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          zipcode: customer.address.zipcode,
          city: customer.address.city
        }
      }))
    }
  }
}