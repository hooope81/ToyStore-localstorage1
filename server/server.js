const express = require('express');
const fs = require('fs');
const app = express();

const PRODUCTS_URL = './server/db/products.json';
const CART_URL = './server/db/userCart.json';

app.use(express.json());
app.use('/', express.static('public'));

//Products API
app.get('/api/getProducts', (req, res) => {
    fs.readFile(PRODUCTS_URL, 'utf-8', (err, data) => {
        if(err){
            res.send({
                result: 0,
                err,
            });
        } else {
            res.send(data);
        }
    })
});

//Cart API
app.get('/api/getCart', (req, res) => {
    fs.readFile(CART_URL, 'utf-8', (err, data) => {
        if(err){
            res.send({
                result: 0,
                err,
            });
        } else {
            res.send(data);
        }
    })
});
app.post('/api/postProduct', (req, res) => {
    fs.readFile(CART_URL, 'utf-8', (err, data) => {
        if(err){
            res.send({
                result: 0,
                err,
            })
        } else {
            const cart = JSON.parse(data)
            cart.contents.push(req.body)

            fs.writeFile(CART_URL, JSON.stringify(cart), { encoding: "utf-8" }, (err)=> {
                if(err){
                    res.send({
                        result: 0,
                        err,
                    })
                } else res.send({result: 1})
            })
        }
    })
});

app.put('/api/putProduct/:id', (req, res) => {
    fs.readFile(CART_URL, 'utf-8', (err, data) => {
        if(err){
            res.send({
                result: 0,
                err,
            })
        } else {
            const cart = JSON.parse(data)
            const change = cart.contents.find(el=> {
                return el.id === +reg.params.id
            })
            change.quantity += req.body.quantity

            fs.writeFile(CART_URL, JSON.stringify(cart), { encoding: "utf-8" }, (err)=> {
                if(err){
                    res.send({
                        result: 0,
                        err,
                    })
                } else res.send({result: 1})
            })
        }
    })
});

app.delete('/api/deleteProduct/:id', (req, res) => {
    fs.readFile(CART_URL, 'utf-8', (err, data) => {
        if(err){
            res.send({
                result: 0,
                err,
            })
        } else {
            const cart = JSON.parse(data);
            const newContents = [];
            cart.contents.forEach(item=> {
                if(item.id === +req.params.id){
                    if(item.quantity !== 1){
                        item.quantity--;
                        newContents.push(item);
                    }
                } else newContents.push(item);
            })
            cart.contents = newContents;

            fs.writeFile(CART_URL, JSON.stringify(cart), { encoding: "utf-8" }, (err)=> {
                if(err){
                    res.send({
                        result: 0,
                        err,
                    })
                } else res.send({
                    result: 1,
                    cartItems: cart
                })
            })
        }
    })
});

app.listen(3000, () => {
    console.log('Server stared!')
})