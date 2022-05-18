import CreateCustomerUseCase from './create.customer.usecase'

describe('CreateCustomer UseCase Unit Tests', () => {

  const input = {
    name: 'Customer 1',
    address: {
      street: 'Street 1',
      number: 1,
      zipcode: 'Zipcode 1',
      city: 'City 1'
    }
  }
  const MockRepository = () => ({
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn()
  })

  it('should create a customer', async () => {
    const customerRepository = MockRepository()
    const useCase = new CreateCustomerUseCase(customerRepository)

    const output = await useCase.execute(input)

    expect(output).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zipcode: input.address.zipcode,
        city: input.address.city
      }
    })
  })

  it('should throw an error when name is missing', async () => {
    const customerRepository = MockRepository()
    const useCase = new CreateCustomerUseCase(customerRepository)

    input.name = ''
    await expect(useCase.execute(input)).rejects.toThrow('name is required')
  })

  it('should throw an error when street is missing', async () => {
    const customerRepository = MockRepository()
    const useCase = new CreateCustomerUseCase(customerRepository)

    input.address.street = ''
    await expect(useCase.execute(input)).rejects.toThrow('Street is required')
  })

})