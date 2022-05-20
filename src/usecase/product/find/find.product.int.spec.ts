import Product from '../../../domain/product/entity/product'
import FindProductUseCase from './find.product.usecase'
import {Sequelize} from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repositotry/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repositotry/sequelize/product.repository'

let sequelize: Sequelize

beforeEach(async () => {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    sync: { force: true }
  })

  await sequelize.addModels([ProductModel])
  await sequelize.sync()
})

afterEach(async () => {
  await sequelize.close()
})

describe('FindProduct Usecase Integration Tests', () => {

  it('should find a product' , async () => {
    const productRepository = new ProductRepository()
    const useCase = new FindProductUseCase(productRepository)

    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const input = { id: '123' }
    const output = await useCase.execute(input)

    expect(output).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price
    })
  })

})