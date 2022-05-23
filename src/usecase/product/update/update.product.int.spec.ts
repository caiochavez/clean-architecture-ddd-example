import UpdateProductUseCase from './update.product.usecase'
import Product from '../../../domain/product/entity/product'
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

describe('UpdateProduct Usecase Integration Tests', () => {

  it('should update a product' , async () => {
    const repository = new ProductRepository()
    const useCase = new UpdateProductUseCase(repository)

    const product = new Product('123', 'Product 1', 10)
    await repository.create(product)

    const input = { id: '123', name: 'Product 1 Updated', price: 15 }
    const output = await useCase.execute(input)

    expect(output).toStrictEqual({
      id: input.id,
      name: input.name,
      price: input.price
    })
  })

})