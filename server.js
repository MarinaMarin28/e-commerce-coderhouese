import express from 'express';
import routerProduct  from './routes/products.js'
import routerCart  from './routes/cart.js'
import bodyParser from 'body-parser'

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/productos', routerProduct);
app.use('/api/carrito', routerCart);
app.use(express.static('public'));
const PORT = 8080;

try {
    const server = app.listen(PORT, () => {
        console.log(`Server listening on port ${server.address().port}`);
    });
} catch (error) {
    console.log(`An error occurred: ${error}`);
}