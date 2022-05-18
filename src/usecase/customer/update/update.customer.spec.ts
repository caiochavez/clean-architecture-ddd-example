import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import Address from '../../../domain/customer/value-object/address'
import UpdateCustomerUseCase from './update.customer.usecase'

const customer = CustomerFactory.createWithAddress(
  'Caio', new Address('Street 1', 100, 'Zipcode 1', 'City 1')
)
const input = {
  id: customer.id,
  name: 'Caio Updated',
  address: {
    street: 'Street Updated',
    number: 100,
    zipcode: 'Zipcode Updated',
    city: 'City Updated'
  }
}

const MockRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(customer))
})

describe("UpdateCustomer UseCase Unit Tests" , () => {

  it('should update a customer', async () => {
    const customerRepository = MockRepository()
    const useCase = new UpdateCustomerUseCase(customerRepository)

    const output = await useCase.execute(input)
    expect(output).toStrictEqual(input)
  })

})