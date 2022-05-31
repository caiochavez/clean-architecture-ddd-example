import CustomerValidatorYup from '../validator/customer.validator.yup'
import Customer from '../entity/customer'
import ValidatorInterface from '../../@shared/validator/validator.interface'

export default class CustomerValidatorFactory {

  public static create(): ValidatorInterface<Customer> {
    return new CustomerValidatorYup()
  }

}