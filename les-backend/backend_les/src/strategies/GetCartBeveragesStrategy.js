const sequelize = require("../config/dbConfig");
const PurchaseDAO = require('../daos/PurchaseDAO');
const GetBeveragesStategy = require('../strategies/GetBeveragesStrategy');
const ApplyPricingGroupStrategy = require('../strategies/ApplyPricingGroupStrategy');
const ApplyBeverageImagesStrategy = require('../strategies/ApplyBeverageImagesStrategy');

class GetCartBeveragesStategy {
    static async execute(data) {
        const transaction = await sequelize.transaction();
        try {
            const cartItems = (await PurchaseDAO.find('cpr_cli_id', data.userId, transaction))
                .filter(cartItem => cartItem.purchaseStatus === 1);

            const beverages = await (async () => {
                const beveragesList = await GetBeveragesStategy.execute();
                await ApplyPricingGroupStrategy.execute(beveragesList);
                return await ApplyBeverageImagesStrategy.execute(beveragesList);
            })();

            const cartBeverages = cartItems.map(cartItem => {
                const beverage = beverages.find(item => item.id === cartItem.beverageId);
                
                return beverage
                ? {
                    beverageId: cartItem.beverageId,
                    beverageLabel: beverage.label,
                    beverageValue: cartItem.purchaseValue,
                    beverageYear: beverage.year,
                    beverageManufacturer: beverage.manufacturer,
                    beverageCountry: beverage.country,
                    beverageAlcoholContent: beverage.alcoholContent,
                    beverageVolume: beverage.volume,
                    beverageQuantity: cartItem.beverageQuantity,
                    imageUrl: beverage.imageUrl
                }
                : null;
            }).filter(item => item !== null);

            await transaction.commit();
            return { status: 200, data: cartBeverages };
        } catch (error) {
            await transaction.rollback();
            throw error.message;
        }
    }
}

module.exports = GetCartBeveragesStategy;