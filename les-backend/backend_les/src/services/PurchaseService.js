const GetPurchasesTableStrategy = require('../strategies/GetPurchasesTableStrategy');
const ValidatePurchaseObjectStrategy = require('../strategies/ValidatePurchaseObjectStrategy');
const UpdatePurchaseStatusStrategy = require('../strategies/UpdatePurchaseStatusStrategy');
const CheckUserIfExistsStrategy = require('../strategies/CheckUserIfExistsStrategy');
const GetUserPurchasesStrategy = require('../strategies/GetUserPurchasesStrategy');

class PurchaseService {
    static async getPurchasesTable() {
        try {
            return await GetPurchasesTableStrategy.execute();
        } catch (error) {
            throw error;
        }
    }

    static async updatePurchaseStatus(purchaseObject) {
        try {
            await ValidatePurchaseObjectStrategy.execute(purchaseObject);
            return await UpdatePurchaseStatusStrategy.execute(purchaseObject);
        } catch (error) {
            throw error;
        }
    }

    static async getUserPurchases(userId) {
        try {
            await CheckUserIfExistsStrategy.execute(userId);
            return await GetUserPurchasesStrategy.execute(userId);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PurchaseService;
