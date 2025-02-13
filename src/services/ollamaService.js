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
            // Check if Ollama is running before making the request
            try {
                await fetch(`http://${this.currentConfig.apiUrl.split('//')[1].split('/')[0]}`);
            } catch (error) {
                throw new Error(`Cannot connect to Ollama server at ${this.currentConfig.apiUrl}. Please ensure Ollama is running.`);
            }

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
                if (response.status === 404) {
                    throw new Error(`Model '${this.currentConfig.model}' not found. Please ensure you have pulled the model using 'ollama pull ${this.currentConfig.model}'`);
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.message.content;
        } catch (error) {
            console.error('Error calling Ollama:', error.message);
            throw error;
        }
    }
}

module.exports = new OllamaService(); 