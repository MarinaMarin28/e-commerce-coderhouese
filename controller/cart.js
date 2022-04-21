import fs from 'fs';
import {ConvertStringToObject, write} from '../utilities.js'

const messageError = 'An error occurred:';
let products = [];
export class Products{
    
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

    async getProductsById (id) {
        try {
            const parsedContent =  await ConvertStringToObject(this.fileName);
            const productFilter = parsedContent.filter(p => p.id === id)
            const product = {
                title: productFilter[0].title,
                price: productFilter[0].price,
                thumbnail: productFilter[0].thumbnail,
                id: productFilter[0].id
            }
            return product;
        } catch (error) {
            throw new Error(`${messageError} ${error}`);
        }
    }

    async updateProductsById(newProduct) {
        try {
            const parsedContent =  await ConvertStringToObject(this.fileName);
            const productsAux = parsedContent.filter(p => p.id != newProduct.id);
            await this.deleteById(newProduct.id);
          
            products = productsAux;
            products.push(newProduct);
            const newProductObjectToString = JSON.stringify(products);            
            await this.write(newProductObjectToString);
            return newProduct;
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

    async AddProducts(product) {
        let newId = 0;            
        const products =  await ConvertStringToObject(this.fileName);          
        newId = products.length + 1;
        let productNew =  {'title': product.title, 'price': product.price, 'thumbnail': product.thumbnail, 'id': newId};
        products.push(productNew);
        const newProductObjectToString = JSON.stringify(products);            
        await this.write(newProductObjectToString);
        return 'Producto Cargado';
    };
}