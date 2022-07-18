import { NextFunction, Request, Response } from 'express';
import ProductModel from '../models/product.model';

const productModel = new ProductModel();


export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.create(req.body);
        res.json({
            product: { ...product },
            msg: 'product created success'
        });
    } catch (err) {
        res.status(500).json({ "msg": `can't create the product`, "error": ` ${err}` });
    }
};


export const show = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productModel.index();
        res.json({
            data: { products },
            msg: 'products show success'
        });
    } catch (err) {
        res.status(500).json({ "msg": `can't find the products`, "error": ` ${err}` });
    }
};


export const showProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.show(req.params.id as unknown as number);
        res.json({
            product: { product },
            msg: 'product show success'
        });
    } catch (err) {
        res.status(500).json({ "msg": `can't find the product`, "error": ` ${err}` });
    }
};


export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.edit(req.body, req.params.id as unknown as number);
        res.json({
            product: { product },
            msg: 'product update success'
        });
    } catch (err) {
        res.status(500).json({ "msg": `can't update the product`, "error": ` ${err}` });
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await productModel.delete(req.params.id as unknown as number);
        res.json({
            product: { product },
            msg: 'product delete success'
        });
    } catch (err) {
        res.status(500).json({ "msg": `can't delete the product`, "error": ` ${err}` });
    }
};

