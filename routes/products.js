import Router from 'express';

import {Products} from '../controller/products.js';

const router = Router();
const productsClass = new Products('./products.txt');
router.get('/', async (req, res) =>{
    let products = await productsClass.getProducts();
    products.length > 0 
    ?
    res.status(200).json(products)
    :
    res.status(400).json({message: 'Theres no products'})
;} );

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    let product = await productsClass.getProductsById(id);
    product != null?
    res.status(200).json(product)
    :
    res.status(404).json({message: 'product not found'})
} );

router.post('/', async (req, res) => {
    const productNew = req.body;
    let products = await productsClass.AddProducts(productNew);
    products != null?
    res.status(201).json(products)
    :
    res.status(400).json({message: 'product could not be loaded'})
} );

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const product = req.body;
    const productNew = { 'id': id, 'timestamp' : product.timestamp, 'name': product.name, 'description': product.description, 'code': product.code, 'thumbnail': product.thumbnail, 'price': product.price, 'stock': product.stock};
    let products = await productsClass.updateProductsById(productNew);
    products != null?
    res.status(200).json(products)
    :
    res.status(400).json({message: 'product could not be updated'})
} );

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    let productId = await productsClass.deleteProductsById(id);
    productId != null?
    res.status(200).json(productId)
    :
    res.status(400).json({message: 'roduct could not be removed'})
} );

export default router;