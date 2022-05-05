import EventHandlerInterface from "../../../@shared/event/event-handler.interface"
import ProductCreatedEvent from "../product-created.event"

export default class ProductCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {

  handle(event: ProductCreatedEvent): void {
    console.log(`Product: ${event.eventData?.name} was created \n Send email now!!!`)
  }

}