import UserModel from '../user.model';
import db from '../../database';
import User from '../../types/user.type';

const userModel = new UserModel();

describe('User Model', () => {
  describe('Test methods exist', () => {
    it('should have an index method', () => {
      expect(userModel.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(userModel.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(userModel.create).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(userModel.delete).toBeDefined();
    });

    it('should have an Authenticate method', () => {
      expect(userModel.authenticate).toBeDefined();
    });
  });

  describe('Test Model logic', () => {
    const user = {
      email: 'eslam@gmail.com',
        userName: 'eslam',
        firstName: 'eslam',
        lastName: 'mo',
        password: '1234'
      }as User;

    afterAll(async () => {
      const connection = await db.connect();
      const sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;';
      await connection.query(sql);
      connection.release();
    });

    it('Create method ', async () => {
      const createdUser = await userModel.create(user);
      expect(createdUser
      ).toEqual(                                      
        {
        id: createdUser.id,
        email: 'eslam@gmail.com',
        userName: 'eslam',
        firstName: 'eslam',
        lastName: 'mo'
            } as User);
    }
    );

    it('Index method ', async () => {
      const users = await userModel.index();
      console.log(users)
      expect(users.length).toBe(1);
      expect(users[0].userName).toBe('eslam');
    });

    it('Show method', async () => {
      const returnedUser = await userModel.show(1);
      console.log(returnedUser)

      expect(returnedUser.id).toBe(1);
      expect(returnedUser.email).toBe('eslam@gmail.com');
      expect(returnedUser.userName).toBe('eslam');
      expect(returnedUser.firstName).toBe('eslam');
      expect(returnedUser.lastName).toBe('mo');
    });

    it('Edit method', async () => {
      const updatedUser = await userModel.edit({
        id: 1,
        email: 'eslam@gmail.com',
        userName: 'eslam',
        firstName: 'eslam',
        lastName: 'mo',
        password: '1234'
      },1);
      console.log(updatedUser)

      expect(updatedUser.email).toBe('eslam@gmail.com');
    });
;


    it('Delete method', async () => {
      const deletedUser = await userModel.delete(1);
      expect(deletedUser.id).toBe(1);
    });
  });
});
 