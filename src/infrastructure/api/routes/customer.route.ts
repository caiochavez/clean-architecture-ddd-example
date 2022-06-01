import express, { Request, Response } from 'express'
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase'
import CustomerRepository from '../../customer/repository/sequelize/customer.repository'
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase'
import CustomerPresenter from '../presenters/customer.presenter'

export const customerRoute = express.Router()

customerRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository())
  try {
    const customerDtoInput = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zipcode: req.body.address.zipcode,
        city: req.body.address.city
      }
    }
    const customerDtoOutput = await usecase.execute(customerDtoInput)
    res.status(201).send(customerDtoOutput)
  } catch (err) {
    res.status(500).send(err)
  }
})

customerRoute.get('/', async (req: Request, res: Response) => {
  try {
    const usecase = new ListCustomerUseCase(new CustomerRepository())
    const customerDtoOutput = await usecase.execute({})

    res.status(200).format({
      json: () => res.send(customerDtoOutput),
      xml: () => res.send(CustomerPresenter.listXML(customerDtoOutput))
    })
  } catch (err) {
    res.status(500).send(err)
  }
})