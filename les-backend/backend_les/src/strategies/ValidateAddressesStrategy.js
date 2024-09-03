class ValidateAddressesStrategy {
    static async execute(data) {
        try {
            if (!Array.isArray(data)) {
                throw new Error('O campo "addresses" deve ser uma lista de objetos.');
            }

            data.forEach(address => {
                const missingFields = ['isDelivery', 'isBilling', 'streetType', 'street', 'number', 'neighborhood', 'cep', 'city', 'state', 'country'].filter(field => !(field in address));
                if (missingFields.length > 0) {
                    throw new Error(`Os seguintes campos estão faltando no endereço: ${missingFields.join(', ')}.`);
                }

                if ((!address.isDelivery && !address.isBilling) || !address.streetType || !address.street || !address.number || !address.neighborhood || !address.cep || !address.city || !address.state || !address.country) {
                    throw new Error('Todos os campos obrigatórios devem estar preenchidos.');
                }

                if (typeof address.isDelivery !== 'boolean' || typeof address.isBilling !== 'boolean') {
                    throw new Error('Os campos "Entrega" e "Cobrança" devem ser booleanos.');
                }

                if (typeof address.streetType !== 'string') {
                    throw new Error('O campo "Tipo Logradouro" deve ser uma string.');
                }

                if (typeof address.street !== 'string') {
                    throw new Error('O campo "Logradouro" deve ser uma string.');
                }

                if (typeof address.number !== 'string') {
                    throw new Error('O campo "Número" deve ser uma string.');
                }

                if (typeof address.neighborhood !== 'string') {
                    throw new Error('O campo "Bairro" deve ser uma string.');
                }

                if (!/^\d{8,9}$|^\d{5}-\d{3}$/.test(address.cep)) {
                    throw new Error('O campo "CEP" deve ser uma string de 8 dígitos ou no formato "00000-000".');
                }

                if (typeof address.city !== 'string') {
                    throw new Error('O campo "Cidade" deve ser uma string.');
                }

                if (typeof address.state !== 'string' || address.state.length !== 2) {
                    throw new Error('O campo "Estado" deve ser uma string de 2 caracteres.');
                }

                if (typeof address.country !== 'string') {
                    throw new Error('O campo "País" deve ser uma string.');
                }
            });
        } catch (error) {
            throw `Endereços — ${error.message}`;
        }
    }
}

module.exports = ValidateAddressesStrategy;