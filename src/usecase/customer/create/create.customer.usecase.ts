import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface'
import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import Address from '../../../domain/customer/value-object/address'
import {InputCreateCustomerDTO, OutputCreateCustomerDTO} from './create.customer.dto'

export default class CreateCustomerUseCase {

  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute (input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
    const { name, address: { street, number, zipcode, city } } = input
    const customer = CustomerFactory.createWithAddress(name, new Address(street, number, zipcode, city))

    await this.customerRepository.create(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zipcode: customer.address.zipcode,
        city: customer.address.city
      }
    }
  }

}