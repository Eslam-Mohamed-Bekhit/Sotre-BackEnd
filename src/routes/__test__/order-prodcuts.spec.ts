 import supertest from 'supertest';
import db from '../../database';
import OrderProduct from '../../types/order-product.type';
import Order from '../../types/order.type';
import Product from '../../types/product.type';
import ProductModel from '../../models/product.model';
import OrderModel from '../../models/order.model';
import app from '../../server';
import UserModel from '../../models/user.model';
import User from '../../types/user.type';


const userModel = new UserModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();
const request = supertest(app);
let token: string = '';

describe('Order Product API Endpoints', () => {
  const user = {
    email: 'eslam@gmail.com',
    userName: 'eslam',
    firstName: 'eslam',
    lastName: 'mo',
    password: '1234'
  } as User;

  const product = {
    name: 'ibad',
    description: 'mobile',
    price: 9000,
    category: 'techno.'
  } as Product;

  const order = {
    userId: 1,
    status: 'active'
  } as Order;

  const orderProduct = {
    quantity: 1,
    orderId: 1,
    productId: 1
  } as OrderProduct;

  beforeAll(async () => {
    await userModel.create(user);
    await productModel.create(product);
    await orderModel.create(order);
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql =
      'DELETE FROM order_products;\nALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });

  describe('get token ', () => {
    it('should be able to authenticate to get token', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          userName: 'eslam',
          password: '1234'
        });
        console.log(res.body,'check for data name')

      expect(res.status).toBe(200);
      const {token: userToken } = res.body.user;
      token = userToken;
    });
  });

  describe('Test CRUD API methods', () => {
    it('should create new order product', async () => {
      const res = await request
        .post('/api/order-products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send(orderProduct);
        console.log(res.body,'check for data name')

      expect(res.status).toBe(200);
      const { id, orderId, productId } = res.body.orderProduct;
      expect(id).toBe(1);
      expect(orderId).toBe(1);
      expect(productId).toBe(1);
    });

    it('should get list of order products', async () => {
      const res = await request
        .get('/api/order-products/1/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('should get order product info', async () => {
      const res = await request
        .get('/api/order-products/1/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('should update order product info', async () => {
      const res = await request
        .get('/api/order-products/1/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
          productId: 1,
          orderId: 1,
          quantity: 2
        });
        console.log(res.body,'check for data name orderProduct')

      const { id, productId } = res.body.orderProduct.orderProduct;
      expect(res.status).toBe(200);
      expect(id).toBe(1);
      expect(productId).toBe(1);
    });

    it('should delete order', async () => {
      const res = await request
        .delete('/api/order-products/1/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          productId: 1,
          orderId: 1
        });
        console.log(res.body,'check for data name')
        console.log(res.body,'check for data name orderProduct.id')

        
      expect(res.status).toBe(200);
      expect(res.body.orderProduct.orderProduct.id).toBe(1);
    });
  });
});
 