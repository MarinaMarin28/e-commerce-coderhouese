import Router from 'express';

import {Carts} from '../controller/cart.js';

const router = Router();
const cartClass = new Carts('./cart.txt');
router.get('/', async (req, res) =>{
    let carts = await cartClass.getAll();
    carts.length > 0 
    ?
    res.status(200).json(carts)
    :
    res.status(400).json({message: 'Theres no carts'})
;} );

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    let cart = await cartClass.getCartsById(id);
    cart != null?
    res.status(200).json(cart)
    :
    res.status(404).json({message: 'cart not found'})
} );

router.post('/', async (req, res) => {
    const cartNew = req.body;
    let carts = await cartClass.AddCarts(cartNew);
    carts != null?
    res.status(201).json(carts)
    :
    res.status(400).json({message: 'carts could not be loaded'})
} );

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const cart = req.body;
    const cartNew = {'id': id, 'timestamp': cart.timestamp, 'products': cart.products};
    let carts = await cartClass.updateCartsById(cartNew);
    carts != null?
    res.status(200).json(carts)
    :
    res.status(400).json({message: 'cart could not be updated'})
} );

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    let cartId = await cartClass.deleteById(id);
    cartId != null?
    res.status(200).json(cartId)
    :
    res.status(400).json({message: 'cart could not be removed'})
} );

export default router;