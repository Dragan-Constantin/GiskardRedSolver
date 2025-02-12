const readline = require('readline');
const ChallengeSolver = require('./challengeSolver');
const ollamaService = require('./services/ollamaService');
const openaiService = require('./services/openaiService');
const anthropicService = require('./services/anthropicService');
const mistralService = require('./services/mistralService');
const { getAvailableServices } = require('./utils/validators');

class App {
    constructor() {
        this.solver = new ChallengeSolver(ollamaService);
        this.isPaused = false;
        this.shouldExit = false;
        this.setupKeyboardControls();
    }

    setupKeyboardControls() {
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        process.stdin.on('keypress', async (str, key) => {
            if (key.name === 'p') {
                this.isPaused = !this.isPaused;
                console.log(this.isPaused ? '\n[PAUSED] Press p to resume, s to switch AI, q to quit' : '\n[RESUMED]');
            } else if (key.name === 'q') {
                console.log('\n[EXITING]');
                this.shouldExit = true;
                process.exit();
            } else if (key.name === 's' && this.isPaused) {
                await this.switchAIService();
            }
        });
    }

    async switchAIService() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const availableServices = getAvailableServices();

        console.log('\nAvailable AI Services:');
        availableServices.forEach(service => {
            console.log(`${service.id}. ${service.name}`);
        });

        const answer = await new Promise(resolve => {
            rl.question(`Select AI service (${availableServices.map(s => s.id).join('/')}): `, resolve);
        });

        const selectedService = availableServices.find(s => s.id === parseInt(answer));
        if (selectedService) {
            switch (selectedService.key) {
                case 'openai':
                    this.solver.setAIService(openaiService);
                    console.log('Switched to OpenAI');
                    break;
                case 'anthropic':
                    this.solver.setAIService(anthropicService);
                    console.log('Switched to Anthropic');
                    break;
                case 'mistral':
                    this.solver.setAIService(mistralService);
                    console.log('Switched to Mistral');
                    break;
                case 'ollama_llama_3_3':
                case 'ollama_deepseek_14b':
                case 'ollama_llama_3_1_8b':
                case 'ollama_mistral_7b':
                    this.solver.setAIService(ollamaService, selectedService.key);
                    console.log(`Switched to ${selectedService.name}`);
                    break;
                default:
                    console.log('Invalid selection, keeping current service');
            }
        } else {
            console.log('Invalid selection, keeping current service');
        }

        rl.close();
    }

    async start() {
        console.log('Starting solver... Press p to pause, q to quit');
        try {
            while (!this.shouldExit) {
                if (!this.isPaused) {
                    await this.solver.runOneAttempt();
                } else {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
        } catch (error) {
            console.error('Error in main execution:', error);
            process.exit(1);
        }
    }
}

if (require.main === module) {
    const app = new App();
    app.start();
}

module.exports = App; 