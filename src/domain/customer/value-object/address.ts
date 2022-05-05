export default class Address {

  _street: string
  _number: number
  _zipcode: string
  _city: string

  constructor(street: string, number: number, zipcode: string, city: string) {
    this._street = street
    this._number = number
    this._zipcode = zipcode
    this._city = city
    this.validate()
  }

  get street(): string {
    return this._street
  }

  get number(): number {
    return this._number
  }

  get zipcode(): string {
    return this._zipcode
  }

  get city(): string {
    return this._city
  }

  validate () {
    if (!this._street) throw new Error('Street is required')
    if (!this._number) throw new Error('Number is required')
    if (!this._zipcode) throw new Error('Zipcode is required')
    if (!this._city) throw new Error('City is required')
  }

  toString () {
    return `${this._street}, ${this._number}, ${this._zipcode} - ${this._city}`
  }

}