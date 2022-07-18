import Order from '../types/order.type';
import db from '../database';
import OrderProduct from '../types/order-product.type';



class OrderModel {
  private formatOrder(order: {
    id?: number | undefined;
    status: string;
    user_id: string;
    user_name?: string;
    products: OrderProduct[];
  }): Order {
    return {
      id: order.id,
      status: order.status,
      userId: +order.user_id,
      userName: order.user_name,
      products: Array.isArray(order.products) && order.products.length > 0 && order.products[0].quantity ? order.products
          : []
    };
  }


  
  async index(): Promise<Order[]> {
    try {
      const conn = await db.connect();
      const sql =
        "SELECT o.id AS id, u.user_name, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id GROUP BY o.id, u.user_name, o.status";
      const result = await conn.query(sql);
      conn.release();
      return result.rows.map((theOrder) => this.formatOrder(theOrder));
    } catch (err) {
      throw new Error(`can't find the orders :${err}`);
    }
  }

  async create(theOrder: Order): Promise<Order> {
    try {
      const conn = await db.connect();
      const sql = 'INSERT INTO orders (user_id, status) values ($1, $2) RETURNING *';
      const result = await conn.query(sql, [theOrder.userId, theOrder.status]);
      const order = result.rows[0];
      conn.release();
      return {
        id: order.id,
        status: order.status,
        userId: +order.user_id
      };
    } catch (err) {
      throw new Error(`can't create order: ${err}`);
    }
  }



  async delete(id: number): Promise<Order> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return {
        id: order.id,
        status: order.status,
        userId: +order.user_id
      };
    } catch (err) {
      throw new Error(`can't delete the order : ${err}`);
    }
  }


  async edit(theOrder: Order): Promise<Order> {
    try {
      const conn = await db.connect();
      const sql = 'UPDATE orders SET user_id=$1, status=$2 WHERE id=$3 RETURNING *';
      const result = await conn.query(sql, [theOrder.userId, theOrder.status, theOrder.id]);
      const order = result.rows[0];
      conn.release();

      return {
        id: order.id,
        status: order.status,
        userId: +order.user_id
      };
    } catch (err) {
      throw new Error(`can't update the order : ${err}`);
    }
  }

  
  
  async getOrderByUserId(userId: number): Promise<Order> {
    try {
      const sql =
        "SELECT o.id AS id, u.user_name, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id WHERE o.user_id = $1 AND o.status = 'active' GROUP BY o.id, u.user_name, o.status, o.user_id";
      const conn = await db.connect();
      const result = await conn.query(sql, [userId]);

      conn.release();
      return this.formatOrder(result.rows[0]);
    } catch (err) {
      throw new Error(`Could not find order for userId ${userId}. ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql =
        "SELECT o.id AS id, u.user_name, o.user_id, JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products, o.status AS status FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id LEFT JOIN users AS u ON u.id = o.user_id WHERE o.id = $1 GROUP BY o.id, u.user_name, o.status, o.user_id";
      const conn = await db.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return this.formatOrder(result.rows[0]);
    } catch (err) {
      throw new Error(`can't find the order : ${err}`);
    }
  }

}

export default OrderModel;
