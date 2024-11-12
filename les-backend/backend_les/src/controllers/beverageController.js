const express = require('express');
const router = express.Router();
const BeverageService = require('../services/BeverageService');

router.get('/all', async (req, res) => {
    try {
        const result = await BeverageService.getBeverages();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar produtos: ${error}`, status: 500 });
    }
});

router.post('/toCart', async (req, res) => {
    const cartObject = req.body;

    try {
        const result = await BeverageService.beverageToCart(cartObject);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao adicionar ${error.beverageLabel} ao carrinho! ${error.message}`, status: 500 });
    }
});

router.get('/getCart', async (req, res) => {
    const userId = req.body;

    try {
        const result = await BeverageService.getCartBeverages(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar produtos do carrinho: ${error}`, status: 500 });
    }
});

module.exports = router;
