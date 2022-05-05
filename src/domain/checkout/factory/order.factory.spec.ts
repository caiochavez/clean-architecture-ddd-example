import { v4 as uuidv4 } from 'uuid'
import OrderFactory from "./order.factory"

describe('Order Factory unit tests',() => {

  it('should create an order',() => {
    const orderProps = {
      id: uuidv4(),
      customerId: uuidv4(),
      items: [
        {
          id: uuidv4(),
          productId: uuidv4(),
          name: 'Item 1',
          price: 10,
          quantity: 1
        }
      ]
    }

    const order = OrderFactory.create(orderProps)

    expect(order.id).toBe(orderProps.id)
    expect(order.customerId).toBe(orderProps.customerId)
    expect(order.items.length).toBe(1)
  })

})