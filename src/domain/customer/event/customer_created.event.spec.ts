import EventDispatcher from "../../@shared/event/event-dispatcher"
import SendConsoleLog1Handler from "./handler/send_console_log_1.handler"
import SendConsoleLog2Handler from "./handler/send_console_log_2.handler"
import CustomerCreatedEvent from "./customer_created.event"

describe('Customer Created Event Tests', () => {

  it('should register handlers of customer_created event', () => {

    const eventDispatcher = new EventDispatcher()
    const sendConsoleLog1Handler = new SendConsoleLog1Handler()
    const sendConsoleLog2Handler = new SendConsoleLog2Handler()

    eventDispatcher.register('customer_created', sendConsoleLog1Handler)
    eventDispatcher.register('customer_created', sendConsoleLog2Handler)

    expect(eventDispatcher.eventHandlers['customer_created']).toBeDefined()
    expect(eventDispatcher.eventHandlers['customer_created'].length).toBe(2)
    expect(eventDispatcher.eventHandlers['customer_created'][0]).toMatchObject(sendConsoleLog1Handler)
    expect(eventDispatcher.eventHandlers['customer_created'][1]).toMatchObject(sendConsoleLog2Handler)

  })

  it('should unregister handlers of customer_created event', () => {

    const eventDispatcher = new EventDispatcher()
    const sendConsoleLog1Handler = new SendConsoleLog1Handler()
    const sendConsoleLog2Handler = new SendConsoleLog2Handler()

    eventDispatcher.register('customer_created', sendConsoleLog1Handler)
    eventDispatcher.register('customer_created', sendConsoleLog2Handler)
    expect(eventDispatcher.eventHandlers['customer_created'][0]).toMatchObject(sendConsoleLog1Handler)
    expect(eventDispatcher.eventHandlers['customer_created'][1]).toMatchObject(sendConsoleLog2Handler)

    eventDispatcher.unregister('customer_created', sendConsoleLog1Handler)
    expect(eventDispatcher.eventHandlers['customer_created']).toBeDefined()
    expect(eventDispatcher.eventHandlers['customer_created'].length).toBe(1)

    eventDispatcher.unregister('customer_created', sendConsoleLog2Handler)
    expect(eventDispatcher.eventHandlers['customer_created']).toBeDefined()
    expect(eventDispatcher.eventHandlers['customer_created'].length).toBe(0)

  })

  it('should notify customer_created event handlers when the customer is created', () => {

    const eventDispatcher = new EventDispatcher()
    const sendConsoleLog1Handler = new SendConsoleLog1Handler()
    const sendConsoleLog2Handler = new SendConsoleLog2Handler()
    const spySendConsoleLog1Handler = jest.spyOn(sendConsoleLog1Handler, 'handle')
    const spySendConsoleLog2Handler = jest.spyOn(sendConsoleLog2Handler, 'handle')

    eventDispatcher.register('customer_created', sendConsoleLog1Handler)
    eventDispatcher.register('customer_created', sendConsoleLog2Handler)
    expect(eventDispatcher.eventHandlers['customer_created'][0]).toMatchObject(sendConsoleLog1Handler)
    expect(eventDispatcher.eventHandlers['customer_created'][1]).toMatchObject(sendConsoleLog2Handler)

    const customerCreatedEvent = new CustomerCreatedEvent(null)
    eventDispatcher.notify('customer_created', customerCreatedEvent)

    expect(spySendConsoleLog1Handler).toBeCalled()
    expect(spySendConsoleLog2Handler).toBeCalled()

  })

})