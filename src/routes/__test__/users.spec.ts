import supertest from 'supertest';
import db from '../../database';
import UserModel from '../../models/user.model';
import User from '../../types/user.type';
import app from '../../server';


let token: string = '';
const userModel = new UserModel();
const request = supertest(app);


describe('User Endpoints Test', () => {
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
    const sql = 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1';
    await connection.query(sql);
    connection.release();
  });
  describe(' Authenticate method Test', () => {
    it('Authenticate method to get token', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-type', 'application/json')
        .send({ userName: 'eslam', password: '1234'
        });
        console.log(res.body.user.token)
      expect(res.status).toBe(200);
      expect(res.body.user.userName).toBe('eslam');
      token = res.body.user.token;

    });
  });

  describe('Test CRUD  ', () => {
    it('create user', async () => {
      const res = await request
        .post('/api/users/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send( {
          email: 'eslam2@gmail.com',
          userName: 'eslam2',
          firstName: 'eslam2',
          lastName: 'mo2',
          password: '12345'
        } );
        expect(res.status).toBe(200);
        const { firstName, lastName ,id, email, userName, } = res.body.user;
        expect(id).toBe(2);
        expect(firstName).toBe('eslam2');
        expect(lastName).toBe('mo2');
        expect(email).toBe('eslam2@gmail.com');
        expect(userName).toBe('eslam2');
        
      });
  it('delete user', async () => {
    const res = await request
      .delete('/api/users/2')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
      console.log(res.body,res.body.user)
    expect(res.status).toBe(200);
    expect(res.body.user.user.id).toBe(2);
  });


  it('get users - index - ', async () => {
    const res = await request
      .get('/api/users/')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
      console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body.users.users.length).toBe(1);
  });

  it('Get user -show-', async () => {
    const res = await request
      .get('/api/users/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    console.log(res.body.user)
    console.log(res.body)  
    expect(res.status).toBe(200);
    expect(res.body.user.user.email).toBe('eslam@gmail.com');
    expect(res.body.user.user.userName).toBe('eslam');

  });

  it(' Update user ', async () => {
    const res = await request
      .patch('/api/users/1')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id: 1,
        email: 'hm@gmail.com',
        userName: 'hany',
        firstName: 'hany',
        lastName: 'eslam',
        password: '123456'
      });
      console.log(res.body,res.body.user)
    expect(res.status).toBe(200);
    const { userName, firstName, lastName } = res.body.user.user;
    expect(firstName).toBe('hany');
    expect(lastName).toBe('eslam');
    expect(userName).toBe('hany');
   
  });



});
});
