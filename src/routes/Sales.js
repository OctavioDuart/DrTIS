const promise = require('bluebird');
const express = require('express');
const router = express.Router();
const salesModel = require('../models/SalesModel');


router.post('/register', (req, res) => {
    const sale = req.body;
    return promise.try(promiseValidData)
        .then(promiseRegister)
        .then(promiseReturn)
        .catch(promiseError)

    function promiseValidData() {
        var error = false; // parâmetro para sabermos se os dados estão ou não corretos 

        if (sale.cpf_client === undefined || sale.cpf_client === null || sale.cpf_client === "") {
            res.status(500).send({ mensagem: "Você deve informar o CPF do cliente" });
            error = true;
        }


        // Validação de cada item das vendas
        sale.products.forEach(item => {
            if (item.name === undefined || item.name === null || item.name === "") {
                res.status(500).send({ mensagem: "Você deve informar o nome do produto" });
                error = true;
            }

            if (item.quantity === undefined || item.quantity === null || item.quantity === "" || item.quantity === 0) {
                error = true;
                res.status(500).send({ mensagem: "Você deve informar a quantidade vendida do produto " });
            }

        });

        return error;
    }

    function promiseRegister(result) {
        if (!result) {
            const modelSales = new salesModel(sale);
            return modelSales.save();
        }

        return false;
    }

    function promiseReturn(result) {
        if (result)
            return res.status(200).send({ mensagem: "A venda foi cadastrada com sucesso . " });

        return res.status(500).send({ mensagem: "Ocorreu algum erro interno ao cadastrar a venda" });
    }

    function promiseError(ex) {
        return res.status(500).send(ex.modelSales);
    }
});

router.get('/consult/all', (req, res) => {
    return promise.try(promiseGetSales)
        .then(promiseReturn)
        .catch(promiseError);

    function promiseGetSales() {
        return salesModel.find();
    }

    function promiseReturn(result) {
        if (result.length === 0)
            return res.status(500).send({ mensagem: "Não existem vendas registradas" });

        return res.status(200).send(result);
    }

    function promiseError(ex) {
        return res.status(500).send(ex.message);
    }
});

router.get('/consult/one/:id', (req, res) => {
    return promise.try(promiseGetSale)
        .then(promiseReturn)
        .catch(promiseError)

    function promiseGetSale() {
        return salesModel.findById(req.params.id);
    }

    function promiseReturn(result) {
        if (!result)
            return res.status(500).send({ mensagem: "Venda não encontrada" });

        return res.status(200).send(result);
    }

    function promiseError(ex) {
        return res.status(500).send(ex.message);
    }
});

router.delete('/delete/:id', (req, res) => {
    return promise.try(promiseGetSale)
        .then(promiseDelete)
        .then(promiseReturn)
        .catch(promiseError)

    function promiseGetSale() {
        return salesModel.findById(req.params.id);
    }

    function promiseDelete(result) {
        if (!result)
            return false

        return salesModel.findByIdAndDelete(req.params.id);
    }

    function promiseReturn(result) {
        if (!result)
            return res.status(500).send({ mensagem: "Produto não encontrado" });

        return res.status(200).send({ mensagem: "O produto foi deletado com sucesso" });
    }

    function promiseError(ex) {
        return res.status(500).send(ex.message);
    }
});

router.put('/update', (req, res) => {
    const sale = req.body;
    return promise.try(promiseGetSale)
        .then(promiseUpdateSale)
        .then(promiseReturn)
        .catch(promiseError)

    function promiseGetSale() {
        return salesModel.findById(sale._id);
    }

    function promiseUpdateSale(result) {
        if (!result)
            return false;

        return salesModel.findByIdAndUpdate(sale._id, sale, { new: true });
    }

    function promiseReturn(result) {
        if (!result)
            return res.status(500).send({ mensagem: "Produto não encontrado" });

        return res.status(200).send({ mensagem: "Produto alterado com sucesso" });
    }

    function promiseError(ex) {
        return res.status(500).send(ex.message);
    }
});




module.exports = router;