import Order from "../entity/order"
import OrderItem from "../entity/order_item"

interface Props {
  id: string
  customerId: string
  items: {
    id: string
    productId: string
    name: string
    price: number
    quantity: number
  }[]
}

export default class OrderFactory {

  public static create (props: Props): Order {
    const items = props.items.map(item => {
      const { id, productId, name, price, quantity } = item
      return new OrderItem(id, productId, name, price, quantity)
    })
    return  new Order(props.id, props.customerId, items)
  }

}