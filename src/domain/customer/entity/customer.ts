import Address from "../value-object/address"
import Entity from '../../@shared/entity/entity.abstract'
import NotificationError from '../../@shared/notification/notification.error'
import CustomerValidatorFactory from '../factory/customer.validator.factory'

export default class Customer extends Entity {

  private _name: string
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor(id: string, name: string) {
    super()
    this._id = id
    this._name = name
    this.validate()
    if (this.notification.hasErrors()) throw new NotificationError(this.notification.errors)
  }

  get name (): string {
    return this._name
  }

  get rewardPoints (): number {
    return this._rewardPoints
  }

  get address (): Address {
    return this._address
  }

  validate () {
    const validator = CustomerValidatorFactory.create()
    validator.validate(this)
  }

  changeName (name: string) {
    this._name = name
    this.validate()
  }

  changeAddress (address: Address) {
    this._address = address
  }

  activate () {
    if (!this._address) throw new Error("Address is mandatory to activate a customer")
    this._active = true
  }

  deactivate () {
    this._active = false
  }

  setAddress (address: Address) {
    this._address = address
  }

  isActive (): boolean {
    return this._active
  }

  addRewardPoints (points: number): void {
    this._rewardPoints += points
  }

}