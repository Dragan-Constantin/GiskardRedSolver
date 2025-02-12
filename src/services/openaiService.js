const axios = require('axios');
const config = require('../config/loadEnv');

class OpenAIService {
    async ask(conversation) {
        try {
            const response = await axios.post(config.openai.apiUrl, {
                model: config.openai.model,
                messages: conversation,
                temperature: 1
            }, {
                headers: {
                    'Authorization': `Bearer ${config.openai.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error calling OpenAI:', error);
            throw error;
        }
    }
}

module.exports = new OpenAIService(); 