const express = require('express');
const router = express.Router();
const CouponService = require('../services/CouponService');

router.get('/getByUserId', async (req, res) => {
    try {
        const userId = req.query.userId

        const result = await CouponService.getCoupons(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar cupons: ${error}`, status: 500 });
    }
});

module.exports = router;
