const GetBeveragesStategy = require('../strategies/GetBeveragesStrategy');
const ApplyPricingGroupStrategy = require('../strategies/ApplyPricingGroupStrategy');
const ApplyBeverageImagesStrategy = require('../strategies/ApplyBeverageImagesStrategy');
const ValidateCartObjectStrategy = require('../strategies/ValidateCartObjectStrategy');
const SaveCartObjectStrategy = require('../strategies/SaveCartObjectStrategy');

class BeverageService {
    static async getBeverages() {
        try {
            const beverages = await GetBeveragesStategy.execute();
            await ApplyPricingGroupStrategy.execute(beverages);
            return await ApplyBeverageImagesStrategy.execute(beverages);
        } catch (error) {
            throw error;
        }
    }

    static async beverageToCart(cartObject) {
        try {
            await ValidateCartObjectStrategy.execute(cartObject);
            return await SaveCartObjectStrategy.execute(cartObject);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BeverageService;
