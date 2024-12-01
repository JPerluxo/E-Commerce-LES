const Coupon = require('../models/coupon');

class CouponDAO {
    static async find(field, value, transaction = null) {
        try {
            return await Coupon.findAll({
                where: { [field]: value },
                transaction
            }).then(coupons => coupons.map(coupon => {
                const { userId, ...couponWithoutUserId } = coupon.toJSON();
                return couponWithoutUserId;
            }));
        } catch (error) {
            throw error;
        }
    }

    static async findById(id, transaction = null) {
        try {
            return await Coupon.findByPk(id, {
                transaction
            }).then(coupon => {
                const { userId, ...couponWithoutUserId } = coupon.toJSON();
                return couponWithoutUserId;
            });
        } catch (error) {
            throw error;
        }
    }

    static async update(data, transaction = null) {
        try {
            const { id, ...fieldsToUpdate } = data;
            return await Coupon.update(fieldsToUpdate, {
                where: { id: id },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CouponDAO;