import db from '../database';
import Product from '../types/product.type';

class ProductModel {
  private formatProduct(product: {
    id?: number | undefined;
    name: string;
    description: string;
    price: string;
    category: string;
  }): Product {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: +product.price,
      category: product.category
    };
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO  products (name, description, price, category) values ($1, $2, $3, $4) RETURNING *';

      const result = await conn.query(sql, [p.name, p.description, p.price, p.category]);

      conn.release();

      return this.formatProduct(result.rows[0]);
    } catch (err) {
      throw new Error(`Can't create the product : ${err}`);
    }
  }

  async index(): Promise<Product[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows.map((p) => this.formatProduct(p));
    } catch (err) {
      throw new Error(`Can't find the products : ${err}`);
    }
  }

  async edit(p: Product , id : number): Promise<Product> {
    try {
      const conn = await db.connect();
      const sql =
        'UPDATE products SET name=$1, description=$2, price=$3, category=$4 WHERE id=$5 RETURNING *';
      const result = await conn.query(sql, [
        p.name,
        p.description,
        p.price,
        p.category,
        id
      ]);
      conn.release();
      return this.formatProduct(result.rows[0]);
    } catch (err) {
      throw new Error(`Can't edit the product :  ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';

      const result = await conn.query(sql, [id]);

      conn.release();

      return this.formatProduct(result.rows[0]);
    } catch (err) {
      throw new Error(`Can't delete the product :  ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';

      const conn = await db.connect();

      const result = await conn.query(sql, [id]);

      conn.release();
      return this.formatProduct(result.rows[0]);
    } catch (err) {
      throw new Error(`Can't find the product : ${err}`);
    }
  }
}

export default ProductModel;
