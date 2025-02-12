const axios = require('axios');
const config = require('../config/loadEnv');

class MistralService {
    async ask(conversation) {
        try {
            const response = await axios.post(config.mistral.apiUrl, {
                model: config.mistral.model,
                messages: conversation
            }, {
                headers: {
                    'Authorization': `Bearer ${config.mistral.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error calling Mistral:', error);
            throw error;
        }
    }
}

module.exports = new MistralService(); 