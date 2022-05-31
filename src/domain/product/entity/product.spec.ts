import Product from "./product";

describe("Product unit tests", () => {

  it('should throw error when id is empty', () => {

    expect(() => {
      const product = new Product('', 'Arroz', 2.80)
    }).toThrow('product: id is required')

  })

  it('should throw error when name is empty', () => {

    expect(() => {
      const product = new Product('1', '', 2.80)
    }).toThrow('product: name is required')

  })

  it('should throw error when price not greater than 0', () => {

    expect(() => {
      const product = new Product('1', 'Arroz', -1)
    }).toThrow('product: price must be greater than 0')

  })

  it('should throw error when id, name and price are empty', () => {

    expect(() => {
      const product = new Product('', '', undefined)
    }).toThrow('product: id is required,product: name is required,product: price is required')

  })

  it('should change name', () => {

    const product = new Product('2', 'Iphone 11', 4000)
    product.changeName('Mi 8 Lite')
    expect(product.name).toBe('Mi 8 Lite')

  })

  it('should change price', () => {

    const product = new Product('2', 'Iphone 11', 4000)
    product.changePrice(3000)
    expect(product.price).toBe(3000)

  })

})