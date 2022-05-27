import { app } from './express'
import dotenv from 'dotenv'

dotenv.config()
const port: Number = Number(process.env.PORT) || 3000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})