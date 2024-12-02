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

module.exports = router;
