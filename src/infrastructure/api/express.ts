import express, {Express} from 'express'
import {Sequelize} from 'sequelize-typescript'
import CustomerModel from '../customer/repository/sequelize/customer.model'
import ProductModel from '../product/repositotry/sequelize/product.model'
import { customerRoute, productRoute } from './routes/index'

export const app: Express = express()
app.use(express.json())
app.use('/customer', customerRoute)
app.use('/product', productRoute)

export let sequelize: Sequelize

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  })
  await sequelize.addModels([CustomerModel, ProductModel])
  await sequelize.sync()
}

setupDb()