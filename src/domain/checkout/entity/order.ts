import OrderItem from "./order_item"

export default class Order {

  private readonly _id: string
  private readonly _customerId: string
  private _items: OrderItem[]

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id
    this._customerId = customerId
    this._items = items
    this.validate()
  }

  get id(): string {
    return this._id
  }

  get customerId(): string {
    return this._customerId
  }

  get items(): OrderItem[] {
    return this._items
  }

  changeItems (items: OrderItem[]): void {
    this._items = items
    this.validate()
  }

  validate () {
    if (!this._id) throw new Error("id is required")
    if (!this._customerId) throw new Error("customerId is required")
    if (this._items?.length === 0) throw new Error("items length must be greater than 0")
    if (this._items.some(item => item?.quantity <= 0)) throw new Error('quantity must be greater than 0')
  }

  totalPrice(): number {
    return this._items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  }

}