const express = require('express');
const router = express.Router();
const PurchaseService = require('../services/PurchaseService');

router.get('/table', async (req, res) => {
    try {
        const result = await PurchaseService.getPurchasesTable();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar compras: ${error}`, status: 500 });
    }
});

router.post('/updateStatus', async (req, res) => {
    const purchaseObject = req.body;

    try {
        const result = await PurchaseService.updatePurchaseStatus(purchaseObject);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao alterar status da compra! ${error.message}`, status: 500 });
    }
});

router.get('/getByUserId', async (req, res) => {
    const userId = req.query.userId

    try {
        const result = await PurchaseService.getUserPurchases(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar compras do usuário: ${error}`, status: 500 });
    }
});

module.exports = router;
