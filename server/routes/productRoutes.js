const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');

const Product = mongoose.model('products');

module.exports = (app) => {
    app.get('/api/products', requireLogin, async (req, res) => {
        const products = await Product.find({
            _user: req.user.id
        })

        res.send(products);
    });

    app.get('/api/products/thanks', (req,res) => {
        res.send('Thanks!');
    });


    app.post('/api/products', requireLogin, async (req,res) => {
        const { title, price, count, code, image} = req.body;

        const product = new Product({
            title,
            price,
            count,
            code,
            image,
            _user: req.user.id
        })

        try {
            await product.save();
            await req.user.save();

            res.send(req.user);
        } catch(err) {
            res.status(422).send();
        }

    });

    app.put('/api/products', requireLogin, async (req,res) => {
        const { id } = req.body;
        console.log(req.body)
        const product = await Product.where({code: id}).findOne()

        console.log("buy product", product)
        product.count -= 1


        try {
            
            if(req.user.credits - product.price < 0) {
                res.status(200).send({message: 'Not enough credits'});
                return
            }
            if (product.count == 0) {
                let result = await Product.findOneAndRemove({_id: product._id})
                let products = await Product.find({
                    _user: req.user.id
                })
                req.user.credits -= product.price;
                console.log("result -->", result);
                res.send({products, user: req.user})
                return
            }
            await product.save();
            let products = await Product.find({
                _user: req.user.id
            })
            req.user.credits -= product.price;
            await req.user.save();

            res.send({products, user: req.user});
        } catch(err) {
            console.log('err ==>', err);
            res.status(422).send();
        }

    });
};