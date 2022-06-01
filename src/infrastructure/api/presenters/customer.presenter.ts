import { toXML } from 'jstoxml'
import {OutputListCustomerDTO} from '../../../usecase/customer/list/list.customer.dto'

export default class CustomerPresenter {

  static listXML(data: OutputListCustomerDTO): string {
    return toXML({
      customers: {
        customer: data.customers.map(customer => ({
          id: customer.id,
          name: customer.name,
          address: {
            street: customer.address.street,
            number: customer.address.number,
            zipcode: customer.address.zipcode,
            city: customer.address.city
          }
        }))
      }
    }, {
      header: true,
      indent: ' '
    })
  }

}