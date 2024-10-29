const PricingGroup = require('../models/pricingGroup');

class PricingGroupDAO {
    static async findAll(transaction = null) {
        try {
            return await PricingGroup.findAll({
                attributes: ['id', 'profitMargin'],
                transaction
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PricingGroupDAO;
