import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface"
import {InputFindCustomerDTO, OutputFindCustomerDTO} from "./find.customer.dto"

export default class FindCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute (input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
    const customerFound = await this.customerRepository.find(input.id)
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