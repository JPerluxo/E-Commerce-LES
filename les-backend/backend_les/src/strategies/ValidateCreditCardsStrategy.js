class ValidateCreditCardsStrategy {
    static async execute(data) {
        try {
            if (!Array.isArray(data)) {
                throw new Error('O campo "creditCards" deve ser uma lista de objetos.');
            }

            data.forEach(creditCard => {
                const missingFields = ['name', 'number', 'cvv', 'dueDate', 'isActive', 'flag'].filter(field => !(field in creditCard));
                if (missingFields.length > 0) {
                    throw new Error(`Os seguintes campos estão faltando no cartão de crédito: ${missingFields.join(', ')}.`);
                }

                if (!creditCard.name || !creditCard.number || !creditCard.cvv || !creditCard.dueDate || !creditCard.flag) {
                    throw new Error('Todos os campos obrigatórios devem estar preenchidos.');
                }

                if (typeof creditCard.name !== 'string') {
                    throw new Error('O campo "Nome no Cartão" deve ser uma string.');
                }

                if (!/^\d{12}$|^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(creditCard.number)) {
                    throw new Error('O campo "Nº do Cartão" deve ser uma string de 12 dígitos ou no formato "XXXX XXXX XXXX XXXX".');
                }

                if (!/^\d{3}$/.test(creditCard.cvv)) {
                    throw new Error('O campo "CVV" deve ser uma string de 3 dígitos.');
                }

                if (!/^\d{4}-(\d{2})(-\d{2})?$/.test(creditCard.dueDate)) {
                    throw new Error('O campo "Data de Vencimento" deve estar no formato "YYYY-MM" ou "YYYY-MM-DD".');
                }

                if (typeof creditCard.isActive !== 'boolean') {
                    throw new Error('O campo "Ativo" deve ser um booleano.');
                }

                const flag = parseInt(creditCard.flag, 10);
                if (isNaN(flag) || ![1, 2, 3, 4].includes(flag)) {
                    throw new Error('O campo "Bandeira" deve ter um valor válido.');
                }
            });
        } catch (error) {
            throw `Cartões de Crédito — ${error.message}`;
        }
    }
}

module.exports = ValidateCreditCardsStrategy;