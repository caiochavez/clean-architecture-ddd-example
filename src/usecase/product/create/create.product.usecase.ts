import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import {InputCreateProductDTO, OutputCreateProductDTO} from './create.product.dto'
import Product from '../../../domain/product/entity/product'
import ProductFactory from '../../../domain/product/factory/product.factory'

export default class CreateProductUseCase {

  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute (input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    const product = ProductFactory.create('a', input.name, input.price) as Product
    await this.productRepository.create(product)
    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }

}