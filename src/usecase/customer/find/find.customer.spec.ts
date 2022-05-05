import Customer from '../../../domain/customer/entity/customer'
import Address from '../../../domain/customer/value-object/address'
import FindCustomerUseCase from './find.customer.usecase'

describe('FindCustomer UseCase Unit Tests', () => {

  const customer = new Customer("123", "Customer 1")
  const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
  customer.setAddress(address)

  const MockRepository = () => ({
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer]))
  })

  it('should find a customer', async () => {
    const customerRepository = MockRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

    const input = { id: '123' }
    const output = {
      id: '123',
      name: 'Customer 1',
      address: {
        street: 'Street 1',
        number: 1,
        zipcode: 'Zipcode 1',
        city: 'City 1'
      }
    }

    const result = await usecase.execute(input)
    expect(result).toStrictEqual(output)
  })

  it('should not find a customer', () => {
    const customerRepository = MockRepository()
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found')
    })
    const usecase = new FindCustomerUseCase(customerRepository)
    const input = { id: '123' }

    expect(() => usecase.execute(input)).rejects.toThrow('Customer not found')
  })

})