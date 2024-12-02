const GetPurchasesTableStrategy = require('../strategies/GetPurchasesTableStrategy');
const ValidatePurchaseObjectStrategy = require('../strategies/ValidatePurchaseObjectStrategy');
const UpdatePurchaseStatusStrategy = require('../strategies/UpdatePurchaseStatusStrategy');

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
}

module.exports = PurchaseService;
