import ValidatorInterface from '../../@shared/validator/validator.interface'
import Customer from '../entity/customer'
import { object, string, ValidationError } from 'yup'

export default class CustomerValidatorYup implements ValidatorInterface<Customer> {

  validate(entity: Customer) {
    try {
      object({
        id: string().required('id is required'),
        name: string().required('name is required')
      }).validateSync({
        id: entity.id,
        name: entity.name
      }, { abortEarly: false })
    } catch (errors) {
      const e = errors as ValidationError
      e.errors.forEach(error => {
        entity.notification.addError({ context: 'customer', message: error })
      })
    }
  }

}