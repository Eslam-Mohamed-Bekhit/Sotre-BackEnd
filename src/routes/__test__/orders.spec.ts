 import supertest from 'supertest';
import db from '../../database';
import app from '../../server';
import UserModel from '../../models/user.model';
import User from '../../types/user.type';

const userModel = new UserModel();
const request = supertest(app);
let token: string = '';

describe('Orders API Endpoints', () => {
  beforeAll(async () => {
    const user = {
      email: 'eslam@gmail.com',
      userName: 'eslam',
      firstName: 'eslam',
      lastName: 'mo',
      password: '1234'
    } as User;

    await userModel.create(user);
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql =
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });

  describe('Test Authenticate method', () => {
    it('should be able to authenticate to get token', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          userName: 'eslam',
          password: '1234'
        });
      expect(res.status).toBe(200);
      console.log(res.body)
      const {token: userToken } = res.body.user;
      token = userToken;
    });
  });

  describe('Test methods', () => {
    it('create ', async () => {
      const res = await request
        .post('/api/orders/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: 1,
          status: 'active'
        });
      expect(res.status).toBe(200);
      console.log(res.body)
      const { id, userId } = res.body.order;
      expect(id).toBe(1);
      expect(userId).toBe(1);
    });

    it(' get orders', async () => {
      const res = await request
        .get('/api/orders/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      console.log(res.body.orders.orders)
      expect(res.body.orders.orders.length).toBe(1);
      expect(res.body.orders.orders[0].userId).toBe(1);
    });

    it(' get order ', async () => {
      const res = await request
        .get('/api/orders/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
        console.log(res.body)
      expect(res.status).toBe(200);
      expect(res.body.order.order.userId).toBe(1);
    });

    it(' get order to user', async () => {
      const res = await request
        .get('/api/orders/users/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
        console.log(res.body)
      expect(res.status).toBe(200);
      expect(res.body.order.order.id).toBe(1);
   
    });
    it(' update order ', async () => {
      const res = await request
        .patch('/api/orders/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
          userId: 1,
          status: 'unactive'
        });

      const { status, userId } = res.body.order.order;

      expect(res.status).toBe(200);
      expect(status).toBe('unactive');
      expect(userId).toBe(1);
    });


    it(' delete order', async () => {
      const res = await request
        .delete('/api/orders/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
        console.log(res.body)
      expect(res.status).toBe(200);
      expect(res.body.order.order.id).toBe(1);
    });
  });
});
