const { Op } = require('sequelize');
const Coupon = require('../models/coupon');

class CouponDAO {
    static async save(data, transaction = null) {
        try {
            return await Coupon.create(data, { transaction });
        } catch (error) {
            throw error;
        }
    }
    
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

    static async delete(field, value, transaction = null) {
        try {
            return await Coupon.destroy({
                where: { [field]: value },
                transaction
            });
        } catch (error) {
            throw error;
        }
    }

    static async checkCouponCode(code, transaction = null) {
        try {
            const count = await Coupon.count({
                where: { cpd_codigo: { [Op.like]: `%${code}%` } },
                transaction
            });
            return count > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CouponDAO;
