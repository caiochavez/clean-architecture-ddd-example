import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import Address from '../../../domain/customer/value-object/address'
import ListCustomerUseCase from './list.customer.usecase'

const customer1 = CustomerFactory.createWithAddress(
  'Customer 1', new Address('Street 1', 100, 'Zipcode 1', 'City 1')
)
const customer2 = CustomerFactory.createWithAddress(
  'Customer 2', new Address('Street 2', 100, 'Zipcode 2', 'City 2')
)

const MockRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2]))
})

describe('ListCustomer UseCase Unit Tests', () => {

  it('should list a customer', async () => {
    const repository = MockRepository()
    const useCase = new ListCustomerUseCase(repository)

    const output = await useCase.execute(null)

    expect(output.customers.length).toBe(2)
    expect(output.customers[0].id).toBe(customer1.id)
    expect(output.customers[0].name).toBe(customer1.name)
    expect(output.customers[0].address.street).toBe(customer1.address.street)
    expect(output.customers[1].id).toBe(customer2.id)
    expect(output.customers[1].name).toBe(customer2.name)
    expect(output.customers[1].address.street).toBe(customer2.address.street)
  })

})