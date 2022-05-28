import express, {Request, Response} from 'express'
import ListProductUsecase from '../../../usecase/product/list/list.product.usecase'
import ProductRepository from '../../product/repositotry/sequelize/product.repository'
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase'

export const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository())
  try {
    const productDtoInput = { name: req.body.name, price: req.body.price }
    const productDtoOutput = await usecase.execute(productDtoInput)
    res.status(201).send(productDtoOutput)
  } catch (err) {
    res.status(500).send(err)
  }
})

productRoute.get('/', async (req: Request, res: Response) => {
  try {
    const usecase = new ListProductUsecase(new ProductRepository())
    const productDtoOutput = await usecase.execute({})
    res.status(200).send(productDtoOutput)
  } catch (err) {
    res.status(500).send(err)
  }
})