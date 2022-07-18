import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import usersRoute from './routes/users';
import productsRoute from './routes/products';
import ordersRoute from './routes/orders';
import orderProductsRoute from './routes/order-products';



const app: express.Application = express()

app.use(express.json());

app.use(morgan('dev'));

app.use(cors());

const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

// set end points 

app.use('/api/order-products', orderProductsRoute);

app.use('/api/users', usersRoute);

app.use('/api/orders', ordersRoute);

app.use('/api/products', productsRoute);

// test server

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

// run server and export it for test

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;


