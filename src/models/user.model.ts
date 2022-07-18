import User from '../types/user.type';
import hashPassword from '../utils/hash-password';
import db from '../database';
import bcrypt from 'bcrypt';
import config from '../config';


class UserModel {
  
  private formatUser(user: {
    id?: number | undefined;
    email: string;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
  }): User {
    return {
      id: user.id,
      email: user.email,
      userName: user.user_name,
      firstName: user.first_name,
      lastName: user.last_name
    };
  }
  async create(user: User): Promise<User> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO users (email, user_name, first_name, last_name, password) values ($1, $2, $3, $4, $5) returning *';
      const result = await conn.query(sql, [
        user.email,
        user.userName,
        user.firstName,
        user.lastName,
        hashPassword(user.password as string)
      ]);
      conn.release();
      return this.formatUser(result.rows[0]) 
    } catch (error) {
      throw new Error(`can't create the user: ${error}`);
    }
  }

  async index(): Promise<User[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows.map(u=> this.formatUser(u));
    } catch (err) {
      throw new Error(`Error at retrieving users ${err}`);
    }
  }

  async edit(user: User,id:number): Promise<User> {
    try {
      const conn = await db.connect();
      const sql =
        'UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6 RETURNING *';

      const result = await conn.query(sql, [
        user.email,
        user.userName,
        user.firstName,
        user.lastName,
        hashPassword(user.password as string),
        id
      ]);
      conn.release();
      return  this.formatUser(result.rows[0]);
    } catch (err) {
      throw new Error(`can't update the user, ${err}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return this.formatUser(result.rows[0]);
    } catch (err) {
      throw new Error(`can't delete the user, ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const conn = await db.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return  this.formatUser(result.rows[0]);
    } catch (err) {
      throw new Error(`can't find the user, ${err}`);
    }
  }

  async authenticate(user: User): Promise<User | null> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT password FROM users WHERE user_name=$1';
      const result = await conn.query(sql, [user.userName]);
      if (result.rows.length > 0) {
        const  hashedPassword = result.rows[0].password;
        const valid = bcrypt.compareSync(`${user.password}${config.pepper}`, hashedPassword);
        if (valid) {
          const sql = 'SELECT * FROM users WHERE user_name=($1)';
          const result = await conn.query(sql, [
            user.userName
          ]);
          return  this.formatUser(result.rows[0]);
        }
      }
      conn.release();
      return null;
    } catch (error) {
      throw new Error(`can't sign in: ${error}`);
    }
  }
}

export default UserModel;
 