import {app, sequelize} from '../express'
import request from 'supertest'

describe('Product E2E Tests', () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const response = await request(app)
      .post('/product')
      .send({ name: 'Product', price: 100 })

    expect(response.status).toBe(201)
    expect(response.body.name).toBe('Product')
    expect(response.body.price).toBe(100)
  })

  it('should not create a product', async () => {
    const response = await request(app)
      .post('/product')
      .send({ name: 'Product' })

    expect(response.status).toBe(500)
  })

  it('should list all product', async () => {
    const response = await request(app)
      .post('/product')
      .send({ name: 'Product', price: 100 })
    expect(response.status).toBe(201)

    const response2 = await request(app)
      .post('/product')
      .send({ name: 'Product 2', price: 200 })
    expect(response2.status).toBe(201)

    const listResponse = await request(app).get('/product').send()
    expect(listResponse.status).toBe(200)
    expect(listResponse.body.products[0].name).toBe('Product')
    expect(listResponse.body.products[0].price).toBe(100)
    expect(listResponse.body.products[1].name).toBe('Product 2')
    expect(listResponse.body.products[1].price).toBe(200)
  })

})