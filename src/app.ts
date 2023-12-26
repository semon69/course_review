import express, { Request, Response } from 'express'
import cors from 'cors';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFoundApi } from './app/middlewares/notFoundApi';
const app = express()

// Parser
app.use(express.json());
app.use(cors());

app.use('/', router);

app.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'Welcome to course review website'
  })
})

app.use(globalErrorHandler)
app.use(notFoundApi)

export default app