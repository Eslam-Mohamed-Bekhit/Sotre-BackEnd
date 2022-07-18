import { NextFunction, Request, Response } from 'express';
import OrderModel from '../models/order.model';

const orderModel = new OrderModel();

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.create(req.body);
    res.json({
      order: { ...order },
      message: 'the order created successfully'
    });
  } catch (err) {
    res.status(500).json({ "msg": `can't create the order`, "error": ` ${err}` });
  }
};

export const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await orderModel.index();
    res.json({
      orders: { orders },
      message: 'the orders available'
    });
  } catch (err) {
    res.status(500).json({ "msg": `can't find the orders`, "error": ` ${err}` });
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.show(req.params.id as unknown as number);
    res.json({
      order: { order },
      message: 'the order exist'
    });
  } catch (err) {
    res.status(500).json({ "msg": `can't delete the order`, "error": ` ${err}` });
  }
};

export const getOrderByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.getOrderByUserId(req.params.id as unknown as number);
    res.json({
      order: { order },
      message: 'order exist '
    });
  } catch (err) {
    res.status(500).json({ "msg": `can't find the order`, "error": ` ${err}` });
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.edit(req.body);
    res.json({
      order: { order },
      message: 'the order updated '
    });
  } catch (err) {
    res.status(500).json({ "msg": `can't update the order`, "error": ` ${err}` });
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.delete(req.params.id as unknown as number);
    res.json({
      order: { order },
      message: 'the order  delete'
    });
  } catch (err) {
    res.status(500).json({ "msg": `can't delete the order`, "error": ` ${err}` });
  }
};

