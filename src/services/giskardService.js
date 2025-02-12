const axios = require('axios');
const config = require('../config/loadEnv');

class GiskardService {
    async tryPrompt(prompt) {
        try {
            const response = await axios.post(config.giskard.apiUrl, {
                user_prompt: prompt
            }, {
                headers: {
                    'Authorization': `Bearer ${config.giskard.token}`,
                    'Content-Type': 'application/json',
                    'Origin': 'https://red.giskard.ai',
                    'Referer': 'https://red.giskard.ai/challenges/insecure-agents/email-assistant-3'
                }
            });
            
            if (response.data.success) {
                console.log('\n🎉 Congratulations! You have successfully completed the challenge!');
                console.log('Winning prompt:', prompt);
                process.exit(0);
            }
            
            return response.data;
        } catch (error) {
            console.error('Error calling Giskard:', error);
            throw error;
        }
    }
}

module.exports = new GiskardService();