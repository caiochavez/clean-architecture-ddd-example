import Order from "./order"
import OrderItem from "./order_item"

describe('Order unit tests', () => {

  it('should throw error when id is empty', () => {

    expect(() => {
      const order = new Order('', '123', [])
    }).toThrowError('id is required')

  })

  it('should throw error when customerId is empty', () => {

    expect(() => {
      const order = new Order('1', '', [])
    }).toThrowError('customerId is required')

  })

  it('should throw error when items length not greater than 0', () => {

    expect(() => {
      const order = new Order('1', '123', [])
    }).toThrowError('items length must be greater than 0')

  })

  it('should calculate total price', () => {

    const item1 = new OrderItem('11', '1', 'Item 1', 100, 2)
    const item2 = new OrderItem('12', '2', 'Item 2', 200, 2)
    const order = new Order('1', '123', [item1, item2])
    expect(order.totalPrice()).toBe(600)

  })

  it('should throw error when quantity not is greater than 0', () => {

    expect(() => {
      const item1 = new OrderItem('11', '1', 'Item 1', 100, 0)
      const item2 = new OrderItem('12', '2', 'Item 2', 200, -1)
      const order = new Order('1', '123', [item1, item2])
    }).toThrowError('quantity must be greater than 0')

  })

  it('should change items', () => {
    const item1 = new OrderItem('11', '1', 'Item 1', 100, 2)
    const item2 = new OrderItem('12', '2', 'Item 2', 200, 2)
    const order = new Order('1', '123', [item1, item2])
    expect(order.items).toStrictEqual([item1, item2])

    const item3 = new OrderItem('13', '3', 'Item 3', 300, 2)
    order.changeItems([item3])
    expect(order.items).toStrictEqual([item3])
  })

})