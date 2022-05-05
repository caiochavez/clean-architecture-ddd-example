import EventDispatcher from "../../@shared/event/event-dispatcher"
import SendConsoleLogHandler from "./handler/send_console_log.handler"
import Customer from "../entity/customer"
import Address from "../value-object/address"
import CustomerAddressChangedEvent from "./customer_address_changed.event"

describe('Customer Address Changed Event Tests', () => {

  it('should register handlers of customer_address_changed event', () => {

    const eventDispatcher = new EventDispatcher()
    const sendConsoleLogHandler = new SendConsoleLogHandler()

    eventDispatcher.register('customer_address_changed', sendConsoleLogHandler)

    expect(eventDispatcher.eventHandlers['customer_address_changed']).toBeDefined()
    expect(eventDispatcher.eventHandlers['customer_address_changed'].length).toBe(1)
    expect(eventDispatcher.eventHandlers['customer_address_changed'][0]).toMatchObject(sendConsoleLogHandler)
  })

  it('should unregister handlers of customer_address_changed event', () => {

    const eventDispatcher = new EventDispatcher()
    const sendConsoleLogHandler = new SendConsoleLogHandler()

    eventDispatcher.register('customer_address_changed', sendConsoleLogHandler)
    expect(eventDispatcher.eventHandlers['customer_address_changed'][0]).toMatchObject(sendConsoleLogHandler)

    eventDispatcher.unregister('customer_address_changed', sendConsoleLogHandler)
    expect(eventDispatcher.eventHandlers['customer_address_changed']).toBeDefined()
    expect(eventDispatcher.eventHandlers['customer_address_changed'].length).toBe(0)

  })

  it('should notify customer_address_changed event handlers when the customer address changed', () => {

    const eventDispatcher = new EventDispatcher()
    const sendConsoleLogHandler = new SendConsoleLogHandler()
    const spyEventHandler = jest.spyOn(sendConsoleLogHandler, 'handle')

    eventDispatcher.register('customer_address_changed', sendConsoleLogHandler)
    expect(eventDispatcher.eventHandlers['customer_address_changed'][0]).toMatchObject(sendConsoleLogHandler)

    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Rua do nado', 33, '63180-000', 'Barbalha')
    customer.changeAddress(address)

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: customer.id,
      name: customer.name,
      address: customer.address
    })
    eventDispatcher.notify('customer_address_changed', customerAddressChangedEvent)

    expect(spyEventHandler).toBeCalled()

  })

})