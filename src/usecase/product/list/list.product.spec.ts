import ProductFactory from '../../../domain/product/factory/product.factory'
import Product from '../../../domain/product/entity/product'
import ListProductUsecase from './list.product.usecase'

const product1 = ProductFactory.create('a', 'Product 1', 10) as Product
const product2 = ProductFactory.create('a', 'Product 2', 20) as Product

const MockRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2]))
})

describe('ListProduct Usecase Unit Tests', () => {

  it('should list a products', async () => {
    const repository = MockRepository()
    const useCase = new ListProductUsecase(repository)

    const output = await useCase.execute({})

    expect(output.products.length).toBe(2)
    expect(output.products[0].id).toBe(product1.id)
    expect(output.products[0].name).toBe(product1.name)
    expect(output.products[1].id).toBe(product2.id)
    expect(output.products[1].name).toBe(product2.name)
  })

})