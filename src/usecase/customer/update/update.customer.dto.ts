export interface InputUpdateCustomerDTO {
  id: string
  name: string
  address: {
    street: string
    number: number
    zipcode: string
    city: string
  }
}

export interface OutputUpdateCustomerDTO {
  id: string
  name: string
  address: {
    street: string
    number: number
    zipcode: string
    city: string
  }
}