import fs from 'fs';
import {ConvertStringToObject, write} from '../utilities.js'

const messageError = 'An error occurred:';
let carts = [];
export class Carts{
    
    constructor(fileName){
        this.fileName = fileName;
    }

     async write(data){
        try {
            await fs.promises.writeFile(this.fileName, data, 'utf-8');
            console.log('Correctly typed file!!!');
        } catch (error) {
            throw new Error(`${messageError} ${error}`);
        }
    }

    async getAll(){
        try{            
            const parsedContent =  await ConvertStringToObject(this.fileName);            
            return parsedContent;
           
        } catch(error) {
            throw new Error(`${messageError} ${error}`);
        }
    }

    async getCartsById (id) {
        try {
            const parsedContent =  await ConvertStringToObject(this.fileName);
            const cartFilter = parsedContent.filter(p => p.id === id)
            const cart = {
                id: cartFilter[0].id,
                timestamp: cartFilter[0].timestamp,
                products: cartFilter[0].products,
            }
            return cart;
        } catch (error) {
            throw new Error(`${messageError} ${error}`);
        }
    }

    async updateCartsById(newCart) {
        try {
            const parsedContent =  await ConvertStringToObject(this.fileName);
            const cartsAux = parsedContent.filter(p => p.id != newCart.id);
            await this.deleteById(newCart.id);
          
            carts = cartsAux;
            carts.push(newCart);
            const newCartObjectToString = JSON.stringify(carts);            
            await this.write(newCartObjectToString);
            return newCart;
        } catch (error) {
            return `Error: producto no encontrado ${error}`;
        }
        
    }
    async deleteById(id){
        try {
            const parsedContent =  await ConvertStringToObject(this.fileName);
            let data = parsedContent.filter(c => c.id !== id)
            let dataObjectToString = JSON.stringify(data);
            await fs.promises.writeFile(this.fileName,dataObjectToString);
            console.log(`The id ${id} was successfully deleted!!!`);
        } catch (error) {
            throw new Error(`${messageError} ${error}`);
        }

    }

    async AddCarts(cart) {
        let newId = 0;            
        const carts =  await ConvertStringToObject(this.fileName);          
        newId = carts.length + 1;
        let cartNew =  {'id': newId, 'timestamp': Date.now(), 'products': cart.products};
        carts.push(cartNew);
        const newCartObjectToString = JSON.stringify(carts);            
        await this.write(newCartObjectToString);
        return 'Carrito Cargado';
    };
}