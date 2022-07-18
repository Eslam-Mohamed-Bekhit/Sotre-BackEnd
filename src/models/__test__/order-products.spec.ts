import db from '../../database';
import UserModel from '../user.model';
import ProductModel from '../product.model';
import OrderProductModel from '../order-products.model';
import Order from '../../types/order.type';
import OrderProduct from '../../types/order-product.type';
import User from '../../types/user.type';
import Product from '../../types/product.type';
import OrderModel from '../order.model';

const orderModel = new OrderModel();
const orderProductModel = new OrderProductModel();
const userModel = new UserModel();
const productModel = new ProductModel();


describe('Test Order-Product Model', () => {
  describe('Test methods', () => {
    it(' index method', () => {
      expect(orderProductModel.index).toBeDefined();
    });

    it(' show method', () => {
      expect(orderProductModel.show).toBeDefined();
    });

    it(' create method', () => {
      expect(orderProductModel.create).toBeDefined();
    });

    it(' delete method', () => {
      expect(orderProductModel.delete).toBeDefined();
    });
  });

  describe('Test Order Products Model logic', () => {
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

    it('Create method', async () => {
      const createdOrderProduct = await orderProductModel.create(orderProduct);
      expect(createdOrderProduct.quantity).toBe(1);
    });

    it('Index method ', async () => {
      const orderProducts = await orderProductModel.index(1);
      expect(orderProducts[0].id).toBe(1);
    });

    it('Show method ', async () => {
      const targetOrderProduct = await orderProductModel.show(1, 1);
      expect(targetOrderProduct.quantity).toBe(1);
    });

    it('Edit method ', async () => {
      const editOrderProduct = await orderProductModel.edit({
        id: 1,
        quantity: 10,
        orderId: 1,
        productId: 1
      });
      expect(editOrderProduct.quantity).toEqual(10);
    });

    it('Delete method ', async () => {
      const deletedOrderProduct = await orderProductModel.delete(1, 1);
      expect(deletedOrderProduct.id).toBe(1);
    });
  });
});
 