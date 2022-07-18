import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import UserModel from '../models/user.model';
import authenticationMiddleware from '../middleware/authentication.middleware';

const userModel = new UserModel();

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.create(req.body);
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
    res.json({
      user: { ...user, token },
      msg: 'user created success'
    });
  } catch (err) {
    res.status(500).json({ "msg": `can't create the user`, "error": ` ${err}` });
  }
};



export const show = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.index();
    res.json({
      users: { users },
      msg: 'show users success'
    });
  } catch (err) {
    res.status(500).json({ "msg": `can't find the users`, "error": ` ${err}` });
  }
}



export const showUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.show(req.params.id as unknown as number);
    res.json({
      user: { user },
      msg: 'show user success'
    });
  } catch (err) {
    res.status(500).json({ "msg": `can't find the user`, "error": ` ${err}` });
  }
}



export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.edit(req.body, req.params.id as unknown as number);
    res.json({
      user: { user },
      msg: 'updated success'
    });
  } catch (err) {
    res.status(500).json({ "msg": `can't update the user`, "error": ` ${err}` });
  }
}



export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.delete(req.params.id as unknown as number);
    res.json({
      user: { user },
      msg: 'user deleted '
    });
  } catch (err) {
    res.status(500).json({ "msg": `can't delete the user`, "error": ` ${err}` });
  }
}


export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userName, password } = req.body;

    const user = await userModel.authenticate(req.body);
    const token = jwt.sign({ user }, config.tokenSecret as unknown as string);
    if (!user) {
      return res.json({
        msg: 'the username and password do not match please try again'
      });
    }
    return res.json({
      user: { ...user, token },
      msg: 'user authenticated successfully'
    });
  } catch (err) {
    res.status(500).json({ "msg": `can't sgin in the user`, "error": ` ${err}` });
  }
}


