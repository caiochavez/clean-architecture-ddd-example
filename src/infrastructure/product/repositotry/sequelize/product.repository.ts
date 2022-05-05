import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface"
import Product from "../../../../domain/product/entity/product"
import ProductModel from "./product.model"

export default class ProductRepository implements ProductRepositoryInterface
{

  async create(entity: Product): Promise<void> {
    try {
      await ProductModel.create({
        id: entity.id,
        name: entity.name,
        price: entity.price
      })
    } catch {
      throw new Error("Error on create ProductModel in the Sequelize")
    }
  }

  async find(id: string): Promise<Product> {
    try {
      const productModel = await ProductModel.findOne({ where: { id } })
      const product = new Product(productModel.id, productModel.name, productModel.price)
      return product
    } catch (err) {
      throw new Error("Error on find ProductModel in the Sequelize")
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const productsModel = await ProductModel.findAll()
      return productsModel.map(productModel => {
        return new Product(productModel.id, productModel.name, productModel.price)
      })
    } catch (err) {
      throw new Error("Error on find all ProductModel in the Sequelize")
    }
  }

  async update(entity: Product): Promise<void> {
    try {
      await ProductModel.update(
        { name: entity.name, price: entity.price },
        { where: { id: entity.id } }
      )
    } catch (err) {
      throw new Error("Error on update ProductModel in the Sequelize")
    }
  }

}