import Customer from "./customer"
import Address from "../value-object/address"

describe('Customer unit tests',() => {

  it('should throw error when id is empty', () => {

    expect(() => {
      const customer = new Customer("", "Maria da Silva")
    }).toThrowError('id is required')

  })

  it('should throw error when name is empty', () => {

    expect(() => {
      const customer = new Customer("1", "")
    }).toThrowError('name is required')

  })

  it('should change name', () => {

    const customer = new Customer('2', 'Ricardo')
    customer.changeName('Carlos')
    expect(customer.name).toBe('Carlos')

  })

  it('should activate customer', () => {

    const customer = new Customer('1', 'Vanessa')
    const address = new Address('Rua do nado', 33, '63180-000', 'Barbalha')
    customer.setAddress(address)
    customer.activate()
    expect(customer.isActive()).toBe(true)

  })

  it('should deactivate customer', () => {

    const customer = new Customer('1', 'Vanessa')
    customer.deactivate()
    expect(customer.isActive()).toBe(false)

  })

  it('should throw error when address is empty when you activate a customer', () => {

    expect(() => {
      const customer = new Customer('1', 'Vanessa')
      customer.activate()
    }).toThrowError('Address is mandatory to activate a customer')

  })

  it("should add reward points", () => {

    const customer = new Customer("1", "Customer 1")
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)

  })

})