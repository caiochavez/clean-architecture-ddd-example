import ProductCreatedHandler from "../../product/event/handler/product-created.handler"
import EventDispatcher from "./event-dispatcher"
import ProductCreatedEvent from "../../product/event/product-created.event"

describe("Domain event tests", () => {

  it("should register an event handler", () => {

    const eventDispatcher = new EventDispatcher()
    const eventHandler = new ProductCreatedHandler()

    eventDispatcher.register('product_created', eventHandler)

    expect(eventDispatcher.eventHandlers['product_created']).toBeDefined()
    expect(eventDispatcher.eventHandlers['product_created'].length).toBe(1)
    expect(eventDispatcher.eventHandlers['product_created'][0]).toMatchObject(eventHandler)

  })

  it('should unregister an event handler', () => {

    const eventDispatcher = new EventDispatcher()
    const eventHandler = new ProductCreatedHandler()

    eventDispatcher.register('product_created', eventHandler)
    expect(eventDispatcher.eventHandlers['product_created'][0]).toMatchObject(eventHandler)

    eventDispatcher.unregister('product_created', eventHandler)

    expect(eventDispatcher.eventHandlers['product_created']).toBeDefined()
    expect(eventDispatcher.eventHandlers['product_created'].length).toBe(0)

  })

  it('should unregister all event handlers', () => {

    const eventDispatcher = new EventDispatcher()
    const eventHandler = new ProductCreatedHandler()

    eventDispatcher.register('product_created', eventHandler)
    expect(eventDispatcher.eventHandlers['product_created'][0]).toMatchObject(eventHandler)

    eventDispatcher.unregisterAll()

    expect(eventDispatcher.eventHandlers['product_created']).toBeUndefined()

  })

  it('should notify all event handlers', () => {

    const eventDispatcher = new EventDispatcher()
    const eventHandler = new ProductCreatedHandler()
    const spyEventHandler = jest.spyOn(eventHandler, 'handle')

    eventDispatcher.register('product_created', eventHandler)
    expect(eventDispatcher.eventHandlers['product_created'][0]).toMatchObject(eventHandler)

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      price: 10.5
    })

    eventDispatcher.notify('product_created', productCreatedEvent)

    expect(spyEventHandler).toHaveBeenCalled()

  })

})