const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product')

/* GET ALL PRODUCTS */
router.get('/', (req, res) => {
    Product.find((err, products) => {
        if (err) {
            res.send(err)
        }
        else {
            res.json(products);
        }
    });
});

/* INSERT PRODUCT */

router.post('/', (req, res) => {

    if (!req.body.name) {
        res.json({ success: false, message: 'Name required' });
    }
    if (!req.body.description) {
        res.json({ success: false, message: 'Description required' });
    }
    if (!req.body.quantity) {
        res.json({ success: false, message: 'Quantity required' });
    }
    else {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity
        });
        product.save((err, product) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, message: 'Product saved' });
            }
        });
    }
});

/* UPDATE PRODUCT */
router.put('/', (req, res) => {
    Product.findOne({ _id: req.body._id }, (err, product) => {
        product.name = req.body.name,
            product.description = req.body.description,
            product.quantity = req.body.quantity
        product.save((err) => {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                res.json({ success: true, message: 'Product updated' });
            }
        });
    });
});

/* DELETE PRODUCT */
router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, req.body, (err, product) => {
        if (err) {
            res.json({ success: false, message: err });
        }
        else {
            res.json({ success: true, message: 'Product deleted' });
        }
    });
});

module.exports = router;