function validateEnvironment() {
    const requiredEnvVars = ['GISKARD_TOKEN']; // Only Giskard is absolutely required
    for (const envVar of requiredEnvVars) {
        if (!process.env[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
        }
    }
}

function getAvailableServices() {
    const services = [];
    
    if (process.env.OPENAI_API_KEY) {
        services.push({ id: 1, name: 'OpenAI (GPT-4o-mini)', key: 'openai' });
    }
    
    if (process.env.ANTHROPIC_API_KEY) {
        services.push({ id: 2, name: 'Anthropic (Claude-3-5-Sonnet)', key: 'anthropic' });
    }
    
    if (process.env.MISTRAL_API_KEY) {
        services.push({ id: 3, name: 'Mistral (Large)', key: 'mistral' });
    }
    
    // Add all Ollama models since they're local
    services.push({ id: 4, name: 'Ollama (Llama-3)', key: 'ollama_llama_3_3' });
    services.push({ id: 5, name: 'Ollama (Deepseek-14B)', key: 'ollama_deepseek_14b' });
    services.push({ id: 6, name: 'Ollama (Llama-3.1-8B)', key: 'ollama_llama_3_1_8b' });
    services.push({ id: 7, name: 'Ollama (Mistral-7B)', key: 'ollama_mistral_7b' });
    
    return services;
}

module.exports = {
    validateEnvironment,
    getAvailableServices
}; 