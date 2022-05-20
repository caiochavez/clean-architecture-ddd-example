import ProductFactory from '../../../domain/product/factory/product.factory'
import Product from '../../../domain/product/entity/product'
import ListProductUsecase from './list.product.usecase'
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

afterEach(async() => {
  await sequelize.close()
})

describe('ListProduct Usecase Integration Tests', () => {

  it('should list a products', async () => {
    const repository = new ProductRepository()
    const useCase = new ListProductUsecase(repository)

    const product1 = ProductFactory.create('a', 'Product 1', 10) as Product
    const product2 = ProductFactory.create('a', 'Product 2', 20) as Product
    await repository.create(product1)
    await repository.create(product2)

    const output = await useCase.execute({})

    expect(output.products.length).toBe(2)
    expect(output.products[0].id).toBe(product1.id)
    expect(output.products[0].name).toBe(product1.name)
    expect(output.products[1].id).toBe(product2.id)
    expect(output.products[1].name).toBe(product2.name)
  })

})