import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../customer/repository/sequelize/customer.model"
import OrderModel from "./order.model"
import OrderItemModel from "./order-item.model"
import ProductModel from "../../../product/repositotry/sequelize/product.model"
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository"
import Customer from "../../../../domain/customer/entity/customer"
import Address from "../../../../domain/customer/value-object/address"
import ProductRepository from "../../../product/repositotry/sequelize/product.repository"
import Product from "../../../../domain/product/entity/product"
import OrderItem from "../../../../domain/checkout/entity/order_item"
import Order from "../../../../domain/checkout/entity/order"
import OrderRepository from "./order.repository"

describe("Order repository test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  type CreateOrderRepositoryReturn = {
    order: Order
    product: Product
  }

  async function createOrderRepository(): Promise<CreateOrderRepositoryReturn> {
    const customer = new Customer(String(Date.now()), "Customer 1")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
    customer.setAddress(address)
    const customerRepository = new CustomerRepository()
    await customerRepository.create(customer)

    const product = new Product(String(Date.now()), "Product 1", 10)
    const productRepository = new ProductRepository()
    await productRepository.create(product)

    const orderItem = new OrderItem(String(Date.now()), product.id, product.name, product.price, 2)
    const orderItems = [orderItem]

    const order = new Order(String(Date.now()), customer.id, orderItems)
    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    return { order, product }
  }

  it('should create a new order', async () => {

    const { order } = await createOrderRepository()

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["order_items"]
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.totalPrice(),
      order_items: order.items.map(orderItem => ({
        id: orderItem.id,
        name: orderItem.name,
        price: orderItem.price,
        quantity: orderItem.quantity,
        product_id: orderItem.productId,
        order_id: order.id
      }))
    })

  })

  it('should update a order', async () => {
    const { order, product } = await createOrderRepository()

    const orderItem1 = new OrderItem('123', product.id, 'Item 1', 10, 2)
    const orderItem2 = new OrderItem('321', product.id, 'Item 2', 20, 1)
    const orderItems = [orderItem1, orderItem2]
    order.changeItems(orderItems)

    const orderRepository = new OrderRepository()
    await orderRepository.update(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['order_items']
    })
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.totalPrice(),
      order_items: order.items.map(orderItem => ({
        id: orderItem.id,
        name: orderItem.name,
        price: orderItem.price,
        quantity: orderItem.quantity,
        product_id: orderItem.productId,
        order_id: order.id
      }))
    })

  })

  it('should find a order', async () => {

    const { order } = await createOrderRepository()

    const orderRepository = new OrderRepository()
    const orderFound = await orderRepository.find(order.id)

    expect(orderFound).toStrictEqual(order)

  })

  it('should find all orders', async () => {

    const { order: order1 } = await createOrderRepository()
    const { order: order2 } = await createOrderRepository()

    const orderRepository = new OrderRepository()
    const orders = await orderRepository.findAll()

    expect(orders).toStrictEqual([order1, order2])
    expect(orders).toHaveLength(2)

  })

})