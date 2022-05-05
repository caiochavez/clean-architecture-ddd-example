import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model"
import ProductRepository from "./product.repository"
import Product from "../../../../domain/product/entity/product"

describe('Product repository test', () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a product", async () => {

    const productRepository = new ProductRepository()
    const product = new Product("1", "Product 1", 10)

    await productRepository.create(product)

    const productModelAdded = await ProductModel.findOne({ where: { id: product.id } })

    expect(productModelAdded.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price
    })

  })

  it('should update a product', async () => {

    const productRepository = new ProductRepository()
    const product = new Product("1", "Product 1", 10)

    await productRepository.create(product)

    let productModel = await ProductModel.findOne({ where: { id: product.id } })

    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price
    })

    product.changeName("Product 2")
    product.changePrice(20)

    await productRepository.update(product)
    productModel = await ProductModel.findOne({ where: { id: product.id } })

    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price
    })

  })

  it('should find a product', async () => {

    const productRepository = new ProductRepository()
    const product = new Product("1", "Product 1", 10)

    await productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: product.id } })
    const foundProduct = await productRepository.find(productModel.id)

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price
    })

  });

  it('should find all products', async () => {

    const productRepository = new ProductRepository()
    const product1 = new Product("1", "Product 1", 10)
    await productRepository.create(product1)

    const product2 = new Product("2", "Product 2", 20)
    await productRepository.create(product2)

    const foundProducts = await productRepository.findAll()

    expect([product1, product2]).toEqual(foundProducts)

  });

})