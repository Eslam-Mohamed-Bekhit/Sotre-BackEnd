 import db from '../../database';
import User from '../../types/user.type';
import Product from '../../types/product.type';
import Order from '../../types/order.type';
import OrderModel from '../order.model';
import UserModel from '../user.model';
import ProductModel from '../product.model';

const userModel = new UserModel();
const productModel = new ProductModel();
const orderModel = new OrderModel();

describe('Order Model', () => {
  describe('Test methods exist', () => {
    it('should have an index method', () => {
      expect(orderModel.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(orderModel.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(orderModel.create).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(orderModel.delete).toBeDefined();
    });
  });

  describe('Test Model logic', () => {
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

    beforeAll(async () => {
      // setup user/product to test with
      await userModel.create(user);
      await productModel.create(product);
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql =
        'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;';
      await connection.query(sql);
      connection.release();
    });

    it('Create method ', async () => {
      const createdOrder = await orderModel.create(order);
      expect(createdOrder.id).toEqual(1);
    });

    it('Index method ', async () => {
      const orders = await orderModel.index();
      expect(orders[0].id).toBe(1);
    });

    it('Show method ', async () => {
      const returnedOrder = await orderModel.show(1);
      expect(returnedOrder.id).toEqual(1);
    });

    it('Edit method ', async () => {
      const returnedOrder = await orderModel.edit({
        id: 1,
        userId: 1,
        status: 'completed'
      });
      expect(returnedOrder.status).toBe('completed');
    });

    it('Delete method ', async () => {
      const deletedOrder = await orderModel.delete(1);
      expect(deletedOrder.id).toBe(1);
    });
  });
});
 