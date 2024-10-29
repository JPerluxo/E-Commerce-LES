const GetBeveragesStategy = require('../strategies/GetBeveragesStrategy');
const ApplyPricingGroupStrategy = require('../strategies/ApplyPricingGroupStrategy');
const ApplyBeverageImagesStrategy = require('../strategies/ApplyBeverageImagesStrategy');

class BeverageService {
    static async getBeverages() {
        try {
            const beverages = await GetBeveragesStategy.execute();
            await ApplyPricingGroupStrategy.execute(beverages);
            return ApplyBeverageImagesStrategy.execute(beverages);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BeverageService;
