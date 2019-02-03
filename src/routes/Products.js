const promise = require('bluebird');
const express = require('express');
const router = express.Router();
const productsModel = require('../models/ProductsModel');

router.post('/register', (req, res) => {
    const product = req.body;
    return promise.try(promiseValidData)
        .then(promiseRegister)
        .then(promiseReturn)
        .catch(promiseError)

    // Validação dos dados                  
    function promiseValidData() {
        var error = false;
        if (product.name === undefined || product.name === "" || product.name === null)
            error = true;         

        if (product.price === 0)
            error = true;
            
        return error;
    };

    function promiseRegister(result) {
        if (!result) {
            const modelProducts = new productsModel(product);
            return modelProducts.save();
        };

        return false;
    };

    function promiseReturn(result) {
        if (!result)
            return res.status(500).send({ mensagem: "Você deve informar todos os dados para inserir um novo produto . " });

        return res.status(200).send({ mensagem: "Produto salvo com sucesso . " });
    }

    function promiseError(ex) {
        return res.status(500).send(ex.message)
    }
});

//Consultar todos os produtos
router.get('/consult/all', (req, res) => {
    return promise.try(promiseGetProduct)
        .then(promiseReturn)
        .catch(promiseError)

    function promiseGetProduct() {
        return productsModel.find();
    };

    function promiseReturn(result) {
        if (result.length === 0)
            return res.status(200).send({ mensagem: "Não existem produtos na base de dados" });

        return res.status(200).send(result);
    };

    function promiseError(ex) {
        return res.status(500).send(ex.message);
    };
});



// Consultar produto especifico
router.get('/consult/one/:id', (req, res) => {
    return promise.try(promiseConsult)
        .then(promiseReturn)
        .catch(promiseError)

    function promiseConsult() {
        return productsModel.findById(req.params.id);
    };

    function promiseReturn(result) {
        if (!result)
            return res.status(500).send({ mensagem: "Produto não encontrado" });

        return res.status(200).send(result);
    };

    function promiseError(ex) {
        return res.status(500).send(ex.message);
    };
});

router.delete('/delete/:id', (req, res) => {
    return promise.try(promiseGetProduct)
        .then(promiseDelete)
        .then(promiseReturn)
        .catch(promiseError)

    function promiseGetProduct() {
        return productsModel.findById(req.params.id);
    };

    function promiseDelete(result) {
        if (!result)
            return false;

        return productsModel.findByIdAndDelete(req.params.id);
    };

    function promiseReturn(result) {
        if (result)
            return res.status(200).send({ mensagem: "O produto foi deletado com sucesso . " });

        return res.status(500).send({ mensagem: "O produto não foi encontrado . " })
    };

    function promiseError(ex) {
        return res.status(500).send(ex.message);
    };
});

router.put('/update', (req, res) => {
    const product = req.body;
    return promise.try(promiseGetProduct)
        .then(promiseUpdate)
        .then(promiseReturn)
        .catch(promiseError)

    function promiseGetProduct() {
        return productsModel.findById(product._id);
    };

    function promiseUpdate(result) {
        if (!result)
            return false;

        return productsModel.findByIdAndUpdate(product._id, product, { new: true });
    };

    function promiseReturn(result) {
        if (!result)
            return res.status(500).send({ mensagem: "Produto não encontrado" });

        return res.status(200).send({ mensagem: "Os dados do produto foram alterados com sucesso . " });
    };

    function promiseError(ex) {
        return res.status(500).send(ex.message);
    };
});


module.exports = router;