import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import {InputFindProductDTO, OutputFindProductDTO} from './find.product.dto'

export default class FindProductUseCase {

  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute (input: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const productFound = await this.productRepository.find(input.id)
    return {
      id: productFound.id,
      name: productFound.name,
      price: productFound.price
    }
  }

}