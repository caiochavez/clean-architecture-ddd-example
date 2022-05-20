import UpdateProductUseCase from './update.product.usecase'
import Product from '../../../domain/product/entity/product'

const product = new Product('123', 'Product 1', 10)

const MockRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn()
})

describe('UpdateProduct Usecase Unit Tests', () => {

  it('should update a product' , async () => {
    const repository = MockRepository()
    const useCase = new UpdateProductUseCase(repository)

    const input = { id: '123', name: 'Product 1', price: 10 }
    const output = await useCase.execute(input)

    expect(output).toStrictEqual({
      id: input.id,
      name: input.name,
      price: input.price
    })
  })

})