const GetCouponsStrategy = require('../strategies/GetCouponsStrategy');

class CouponService {
    static async getCoupons(userId) {
        try {
            return await GetCouponsStrategy.execute(userId);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CouponService;
