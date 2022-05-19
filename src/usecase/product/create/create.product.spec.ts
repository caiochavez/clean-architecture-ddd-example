import CreateProductUseCase from './create.product.usecase'

let input: { name: string, price: number }

const MockRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn()
})

beforeEach(() => input = { name: 'Product 1', price: 10 })

describe('CreateProduct Usecase Unit Tests', () => {

  it('should create a product' , async () => {
    const repository = MockRepository()
    const useCase = new CreateProductUseCase(repository)

    const output = await useCase.execute(input)

    expect(output).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  })

  it('should throw an error when name is missing', async () => {
    const repository = MockRepository()
    const useCase = new CreateProductUseCase(repository)

    input.name = ''
    await expect(() => useCase.execute(input)).rejects.toThrow('name is required')
  })

  it('should throw an error when price is less than or equal to zero', async () => {
    const repository = MockRepository()
    const useCase = new CreateProductUseCase(repository)

    input.price = 0
    await expect(() => useCase.execute(input)).rejects.toThrow('price must be greater than 0')

    input.price = -10
    await expect(() => useCase.execute(input)).rejects.toThrow('price must be greater than 0')
  })

})