const config = require('../config/loadEnv');

class OllamaService {
    constructor() {
        this.currentConfig = config.ollama_llama_3_1_8b; // default model
    }

    setModel(modelKey) {
        if (config[modelKey]) {
            this.currentConfig = config[modelKey];
        } else {
            console.warn(`Invalid model key: ${modelKey}, using default model`);
        }
    }

    async ask(conversation) {
        try {
            const response = await fetch(this.currentConfig.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: this.currentConfig.model,
                    messages: conversation,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.message.content;
        } catch (error) {
            console.error('Error calling Ollama:', error);
            throw error;
        }
    }
}

module.exports = new OllamaService(); 