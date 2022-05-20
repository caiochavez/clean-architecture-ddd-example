import Product from '../../../domain/product/entity/product'
import FindProductUseCase from './find.product.usecase'

const product = new Product('123', 'Product 1', 10)
const input = { id: '123' }

const MockRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn()
})

describe('FindProduct Usecase Unit Tests', () => {

  it('should find a product' , async () => {
    const repository = MockRepository()
    const useCase = new FindProductUseCase(repository)

    const output = await useCase.execute(input)

    expect(output).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price
    })
  })

  it('should not find a product', async () => {
    const repository = MockRepository()
    repository.find.mockImplementation(() => {
      throw new Error('Product not found')
    })

    const useCase = new FindProductUseCase(repository)

    await expect(() => useCase.execute(input)).rejects.toThrow('Product not found')
  })

})