const GetBeveragesStategy = require('../strategies/GetBeveragesStrategy');
const ApplyPricingGroupStrategy = require('../strategies/ApplyPricingGroupStrategy');
const ApplyBeverageImagesStrategy = require('../strategies/ApplyBeverageImagesStrategy');
const ValidateCartObjectStrategy = require('../strategies/ValidateCartObjectStrategy');
const SaveCartObjectStrategy = require('../strategies/SaveCartObjectStrategy');
const ValidateUserIdStrategy = require('../strategies/ValidateUserIdStrategy');
const GetCartBeveragesStrategy = require('../strategies/GetCartBeveragesStrategy');
const UpdateBeverageQuantityStrategy = require('../strategies/UpdateBeverageQuantityStrategy');
const RemoveCartBeverageStrategy = require('../strategies/RemoveCartBeverageStrategy');

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

    static async getCartBeverages(userId) {
        try {
            await ValidateUserIdStrategy.execute(userId);
            return await GetCartBeveragesStrategy.execute(userId);
        } catch (error) {
            throw error;
        }
    }

    static async updateCartBeverageQuantity(beverageObject) {
        try {
            await ValidateUserIdStrategy.execute(beverageObject);
            return await UpdateBeverageQuantityStrategy.execute(beverageObject);
        } catch (error) {
            throw error;
        }
    }

    static async removeBeveragefromCart(beverageObject) {
        try {
            await ValidateUserIdStrategy.execute(beverageObject);
            return await RemoveCartBeverageStrategy.execute(beverageObject);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BeverageService;
