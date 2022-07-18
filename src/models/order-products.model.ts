
import db from '../database';
import OrderProduct from '../types/order-product.type';
import Product from '../types/product.type';

class OrderProductModel {
  private formatOrderProduct(oP: {
    id?: number | undefined;
    quantity: number;
    order_id: string;
    product_id: string;
    products: Product[];
  }): OrderProduct {
    return {
      id: oP.id,
      quantity: oP.quantity,
      orderId: +oP.order_id,
      productId: +oP.product_id,
      products:
        Array.isArray(oP.products) && oP.products.length > 0 && oP.products[0].name ? oP.products: []
    };
  }

  async create(oP: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) values ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [oP.quantity, oP.orderId, oP.productId]);
      conn.release();

      return this.formatOrderProduct(result.rows[0]);
    } catch (err) {
      throw new Error(
        `cant find the product for specific order:  ${err}: ${err}`
      );
    }
  }

  async index(orderId: number): Promise<OrderProduct[]> {
    try {
      const conn = await db.connect();
    const sql =  "SELECT o.id AS id, op.order_id, op.product_id, JSON_AGG(JSONB_BUILD_OBJECT('productId', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS products FROM orders AS o LEFT JOIN order_products AS op ON o.id = op.order_id LEFT JOIN products AS p ON op.product_id = p.id WHERE o.id=$1 GROUP BY o.id, op.order_id, op.product_id";
       const result = await conn.query(sql, [orderId]);
      conn.release();
     return result.rows.map((o) => this.formatOrderProduct(o));
    } catch (err) {
      throw new Error(`cant find the products for orders :${err}`);
    }
  }
  
  async show(orderId: number, productId: number): Promise<OrderProduct> {
    try {
      const conn = await db.connect();
      const sql =
        'SELECT op.order_id::INTEGER AS id, op.order_id::INTEGER AS "orderId", op.product_id::INTEGER AS "productId", op.quantity, p.name, p.description, p.category, p.price::INTEGER FROM order_products AS op JOIN products AS p ON p.id=op.product_id WHERE order_id=$1 AND product_id=$2';
      const result = await conn.query(sql, [orderId, productId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `cant find the product for specific order:  ${err}`
      );
    }
  }

  


  async delete(orderId: number, productId: number): Promise<OrderProduct> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM order_products WHERE order_id=($1) and product_id=($2) RETURNING *';
      const result = await conn.query(sql, [orderId, productId]);
      conn.release();
      return this.formatOrderProduct(result.rows[0]);
    } catch (err) {
      throw new Error(`cant delete the product: ${err}`);
    }
  }

  async edit(oP: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await db.connect();
      const sql =
        'UPDATE order_products SET quantity=$1, order_id=$2,  product_id=$3 WHERE id=$4 RETURNING *';
      const result = await conn.query(sql, [oP.quantity, oP.orderId, oP.productId, oP.id]);
      conn.release();
      return this.formatOrderProduct(result.rows[0]);
    } catch (err) {
      throw new Error(
        `cant update the product for the specific order: ${err}`
      );
    }
  }

  
}

export default OrderProductModel;
