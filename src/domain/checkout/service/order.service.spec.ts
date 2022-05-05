import OrderItem from "../entity/order_item"
import Order from "../entity/order"
import OrderService from "./order.service"
import Customer from "../../customer/entity/customer";

describe("Order service unit tests", () => {

  it('should place an order', () => {

    const customer = new Customer("1", "Customer 1")
    const orderItem = new OrderItem("1", "1", "Item 1", 20, 1)

    const order = OrderService.placeOrder(customer, [orderItem])

    expect(customer.rewardPoints).toBe(10)
    expect(OrderService.totalPrice([order])).toBe(20)

  })

  it("should get total price of all orders", () => {

    const orderItem = new OrderItem("1", "1", "Item 1", 20, 1)
    const orderItem2 = new OrderItem("2", "2", "Item 2", 30, 2)

    const order = new Order("1", "1", [orderItem])
    const order2 = new Order("2", "1", [orderItem2])

    const totalPrice = OrderService.totalPrice([order, order2])
    expect(totalPrice).toBe(80)

  })

})