  import supertest from 'supertest';
import app from '../../server';
import UserModel from '../../models/user.model';
import User from '../../types/user.type';
import db from '../../database';

const request = supertest(app);
let token: string = '';
const userModel = new UserModel();


describe('Products  Endpoints', () => {
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
      'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1';
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
      console.log(res.body);
      const {  userName, token: userToken } = res.body.user;
      expect(userName).toBe('eslam');
      token = userToken;
    });
  });

  describe('Test methods', () => {
    it('should create new product', async () => {
      const res = await request
        .post('/api/products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'product name',
          description: 'product description',
          price: 9.99,
          category: 'Electronics.'
        });
      expect(res.status).toBe(200);
      console.log(res.body)
      console.log(res.body.product)

      const { id, name } = res.body.product;
      expect(id).toBe(1);
      expect(name).toBe('product name');
     
    });

    it(' get products', async () => {
      const res = await request
        .get('/api/products/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it(' get product ', async () => {
      const res = await request
        .get('/api/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('update product ', async () => {
      const res = await request
        .patch('/api/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 1,
          name: 'ibad',
          description: 'mobile',
          price: 20,
          category: 'techno.'
        });
        console.log(res.body)
        console.log(res.body.product.product)
      const { id, price } = res.body.product.product;
      expect(res.status).toBe(200);
      expect(id).toBe(1);
      expect(price).toBe(20);
    
    });
    it(' delete ', async () => {
      const res = await request
        .delete('/api/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.product.product.id).toBe(1);
    });

  });
});
  