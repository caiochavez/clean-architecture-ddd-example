import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import {InputListProductDTO, OutputListProductDTO} from './list.product.dto'
import Product from '../../../domain/product/entity/product'

export default class ListProductUsecase {

  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute (input: InputListProductDTO): Promise<OutputListProductDTO> {
    const products = await this.productRepository.findAll()
    return OutputMapper.toOutput(products)
  }

}

class OutputMapper {
  static toOutput (products: Product[]): OutputListProductDTO {
    return {
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price
      }))
    }
  }
}