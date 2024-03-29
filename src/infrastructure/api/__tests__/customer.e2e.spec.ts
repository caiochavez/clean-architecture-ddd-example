import { app, sequelize } from '../express'
import request from 'supertest'

describe('Customer E2E tests', () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'Caio',
        address: {
          street: 'street',
          number: 123,
          zipcode: 'zipcode',
          city: 'city'
        }
      })

    expect(response.status).toBe(201)
    expect(response.body.name).toBe('Caio')
    expect(response.body.address.street).toBe('street')
    expect(response.body.address.number).toBe(123)
    expect(response.body.address.zipcode).toBe('zipcode')
    expect(response.body.address.city).toBe('city')
  })

  it('should not create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({ name: 'Caio' })

    expect(response.status).toBe(500)
  })

  it('should list all customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'Caio',
        address: {
          street: 'street',
          number: 123,
          zipcode: 'zipcode',
          city: 'city'
        }
      })
    expect(response.status).toBe(201)

    const response2 = await request(app)
      .post('/customer')
      .send({
        name: 'Caio 2',
        address: {
          street: 'street 2',
          number: 1234,
          zipcode: 'zipcode 2',
          city: 'city 2'
        }
      })
    expect(response2.status).toBe(201)

    const listResponse = await request(app).get('/customer').send()
    expect(listResponse.status).toBe(200)
    expect(listResponse.body.customers.length).toBe(2)
    expect(listResponse.body.customers[0].name).toBe('Caio')
    expect(listResponse.body.customers[0].address.street).toBe('street')
    expect(listResponse.body.customers[1].name).toBe('Caio 2')
    expect(listResponse.body.customers[1].address.street).toBe('street 2')

    const listResponseXML = await request(app).get('/customer').set('Accept', 'application/xml').send()
    expect(listResponseXML.status).toBe(200)
    expect(listResponseXML.text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(listResponseXML.text).toContain(`<customers>`)
    expect(listResponseXML.text).toContain(`<customer>`)
    expect(listResponseXML.text).toContain(`<name>Caio</name>`)
    expect(listResponseXML.text).toContain(`<address>`)
    expect(listResponseXML.text).toContain(`<street>street</street>`)
    expect(listResponseXML.text).toContain(`<city>city</city>`)
    expect(listResponseXML.text).toContain(`<number>123</number>`)
    expect(listResponseXML.text).toContain(`<zipcode>zipcode</zipcode>`)
    expect(listResponseXML.text).toContain(`</address>`)
    expect(listResponseXML.text).toContain(`</customer>`)
    expect(listResponseXML.text).toContain(`<name>Caio 2</name>`)
    expect(listResponseXML.text).toContain(`<street>street 2</street>`)
    expect(listResponseXML.text).toContain(`</customers>`)
  })

})