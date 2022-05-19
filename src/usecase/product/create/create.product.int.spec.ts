import CreateProductUseCase from './create.product.usecase'
import {Sequelize} from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repositotry/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repositotry/sequelize/product.repository'

let input: { name: string, price: number }
let sequelize: Sequelize

beforeEach(async () => {
  input = { name: 'Product 1', price: 10 }
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

describe('CreateProduct Usecase Integration Tests', () => {

  it('should create a product' , async () => {
    const productRepository = new ProductRepository()
    const useCase = new CreateProductUseCase(productRepository)

    const output = await useCase.execute(input)

    expect(output).toStrictEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  })

  it('should throw an error when name is missing', async () => {
    const productRepository = new ProductRepository()
    const useCase = new CreateProductUseCase(productRepository)

    input.name = ''
    await expect(() => useCase.execute(input)).rejects.toThrow('name is required')
  })

  it('should throw an error when price is less than or equal to zero', async () => {
    const productRepository = new ProductRepository()
    const useCase = new CreateProductUseCase(productRepository)

    input.price = 0
    await expect(() => useCase.execute(input)).rejects.toThrow('price must be greater than 0')

    input.price = -10
    await expect(() => useCase.execute(input)).rejects.toThrow('price must be greater than 0')
  })

})