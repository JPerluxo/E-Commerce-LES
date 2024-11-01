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

module.exports = router;
