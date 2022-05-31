import ValidatorInterface from '../../@shared/validator/validator.interface'
import Product from '../entity/product'
import { object, string, number, ValidationError } from 'yup'

export default class ProductValidatorYup implements ValidatorInterface<Product> {

  validate(entity: Product) {
    try {
      object({
        id: string().required('id is required'),
        name: string().required('name is required'),
        price: number().required('price is required').moreThan(0, 'price must be greater than 0')
      }).validateSync({
        id: entity.id,
        name: entity.name,
        price: entity.price
      }, { abortEarly: false })
    } catch (errors) {
      const e = errors as ValidationError
      e.errors.forEach(error => {
        entity.notification.addError({ context: 'product', message: error })
      })
    }
  }

}