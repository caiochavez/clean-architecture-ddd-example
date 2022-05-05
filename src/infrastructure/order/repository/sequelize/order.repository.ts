import Order from "../../../../domain/checkout/entity/order"
import OrderModel from "./order.model"
import OrderItemModel from "./order-item.model"
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface"
import OrderItem from "../../../../domain/checkout/entity/order_item"

export default class OrderRepository implements OrderRepositoryInterface {

  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.totalPrice(),
      order_items: entity.items.map(item => ({
        id: item.id,
        product_id: item.productId,
        order_id: entity.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    }, {
      include: [{ model: OrderItemModel }]
    })
  }

  async update(entity: Order): Promise<void> {
    try {
      const transaction = await OrderModel.sequelize.transaction()
      await OrderItemModel.destroy({ where: { order_id: entity.id }, transaction })

      const itemsToCreate = entity.items.map(item => ({
        id: item.id,
        product_id: item.productId,
        order_id: entity.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))

      await OrderItemModel.bulkCreate(itemsToCreate, { transaction })
      await OrderModel.update(
        { total: entity.totalPrice() },
        { where: { id: entity.id }, transaction }
      )
    } catch {
      throw new Error('Error on update OrderModel in the Sequelize')
    }
  }

  async find(id: string): Promise<Order> {
    let orderFound: OrderModel
    try {
      orderFound = await OrderModel.findOne({
        where: { id },
        include: ['order_items'],
        rejectOnEmpty: true
      })
    } catch {
      throw new Error('Order not found')
    }

    const items: OrderItem[] = orderFound.order_items.map(order_item => {
      return new OrderItem(
        order_item.id,
        order_item.product_id,
        order_item.name,
        order_item.price,
        order_item.quantity
      )
    })
    const order = new Order(orderFound.id, orderFound.customer_id, items)

    return order
  }

  async findAll(): Promise<Order[]> {
    let ordersFound: OrderModel[]

    try {
      ordersFound = await OrderModel.findAll({ include: ['order_items'] })
      if (ordersFound.length === 0) throw new Error('Orders not found')
    } catch (err) {
      throw err
    }

    const items = (orderItems: OrderItemModel[]): OrderItem[] => {
      return orderItems.map(orderItem => {
        return new OrderItem(
          orderItem.id,
          orderItem.product_id,
          orderItem.name,
          orderItem.price,
          orderItem.quantity
        )
      })
    }
    const orders: Order[] = ordersFound.map(orderFound => {
      return new Order(orderFound.id, orderFound.customer_id, items(orderFound.order_items))
    })

    return orders
  }

}