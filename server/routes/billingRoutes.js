const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middleware/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, (req, res) => {
        console.log('stripe ->', req.body);
        stripe.charges.create({
            amount: req.body.amount * 100,
            currency: "usd",
            source: req.body.token.id, // obtained with Stripe.js
        }).then((charge) => {
            console.log('charge ===>', charge);
            req.user.credits = String(Number(req.user.credits) + Number(req.body.amount));
            return req.user.save();
        }).then((user) => {
            res.send(user);
        })
    });
};