import { NextFunction, Request, Response } from 'express';
import OrderProductModel from '../models/order-products.model';

const orderProductModel = new OrderProductModel();

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderProduct = await orderProductModel.create(req.body);
        res.json({
            orderProduct: { ...orderProduct },
            message: 'Order Product created successfully'
        });
    } catch (err) {
        res.status(500).json({ "msg": `can't create Order Product`, "error": ` ${err}` });
    }
};

export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderProducts = await orderProductModel.index(req.params.id as unknown as number);
        res.json({
            orderProducts: { orderProducts },
            message: 'Order Products retrieved successfully'
        });
    } catch (err) {
        res.status(500).json({ "msg": `can't find Order Products`, "error": ` ${err}` });
    }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderProduct = await orderProductModel.show(req.body.orderId, req.body.productId);
        res.json({
            orderProduct: { orderProduct },
            message: 'Product at target Order retrieved successfully'
        });
    } catch (err) {
        res.status(500).json({ "msg": `can't find Order Product`, "error": ` ${err}` });
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderProduct = await orderProductModel.edit(req.body);
        res.json({
            orderProduct: { orderProduct },
            message: 'order Product updated successfully'
        });
    } catch (err) {
        res.status(500).json({ "msg": `can't edit Order Product`, "error": ` ${err}` });
    }
};

export const deleteOrderProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderProduct = await orderProductModel.delete(req.body.orderId, req.body.productId);
        res.json({
            orderProduct: { orderProduct },
            message: 'Order Product deleted successfully'
        });
    } catch (err) {
        res.status(500).json({ "msg": `can't delete Order Product`, "error": ` ${err}` });
    }
};


