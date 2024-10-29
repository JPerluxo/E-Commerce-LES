const sequelize = require("../config/dbConfig");
const PricingGroupDAO = require('../daos/PricingGroupDAO');

class ApplyPricingGroupStrategy {
    static async execute(beverages) {
        const transaction = await sequelize.transaction();
        try {
            const pricingGroups = (await PricingGroupDAO.findAll()).map(pricingGroup => pricingGroup.toJSON());
            
            beverages.forEach(beverage => {
                const pricingGroup = pricingGroups.find(g => g.id === beverage.pricingGroupId);
                
                if (pricingGroup) {
                    const value = beverage.costPrice + (beverage.costPrice * pricingGroup.profitMargin);
                    beverage.costPrice = value;
                    delete beverage.pricingGroupId;
                }
            });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = ApplyPricingGroupStrategy;
