import Product from "./product";

describe("Product unit tests", () => {

  it('should throw error when id is empty', () => {

    expect(() => {
      const product = new Product('', 'Arroz', 2.80)
    }).toThrowError('id is required')

  })

  it('should throw error when name is empty', () => {

    expect(() => {
      const product = new Product('1', '', 2.80)
    }).toThrowError('name is required')

  })

  it('should throw error when price not greater than 0', () => {

    expect(() => {
      const product = new Product('1', 'Arroz', -1)
    }).toThrowError('price must be greater than 0')

  })

  it('should throw error when price not greater than 0', () => {

    expect(() => {
      const product = new Product('1', 'Arroz', -1)
    }).toThrowError('price must be greater than 0')

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