import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface'
import {InputUpdateCustomerDTO, OutputUpdateCustomerDTO} from './update.customer.dto'
import Address from '../../../domain/customer/value-object/address'

export default class UpdateCustomerUseCase {

  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute (input: InputUpdateCustomerDTO): Promise<OutputUpdateCustomerDTO> {
    const customerFound = await this.customerRepository.find(input.id)
    const { street, number, zipcode, city } = input.address
    customerFound.changeName(input.name)
    customerFound.changeAddress(new Address(street, number, zipcode, city))

    await this.customerRepository.update(customerFound)

    return {
      id: customerFound.id,
      name: customerFound.name,
      address: {
        street: customerFound.address.street,
        number: customerFound.address.number,
        zipcode: customerFound.address.zipcode,
        city: customerFound.address.city
      }
    }
  }

}