const axios = require('axios');
const config = require('../config/loadEnv');

class AnthropicService {
    async ask(conversation) {
        try {
            // Convert conversation format to Anthropic's format
            const messages = conversation.map(msg => ({
                role: msg.role === 'assistant' ? 'assistant' : 'user',
                content: msg.content
            }));

            const response = await axios.post(config.anthropic.apiUrl, {
                model: config.anthropic.model,
                messages: messages,
                max_tokens: 1024
            }, {
                headers: {
                    'x-api-key': config.anthropic.apiKey,
                    'anthropic-version': '2023-06-01',
                    'Content-Type': 'application/json'
                }
            });

            return response.data.content[0].text;
        } catch (error) {
            console.error('Error calling Anthropic:', error);
            throw error;
        }
    }
}

module.exports = new AnthropicService(); 