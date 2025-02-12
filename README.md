# Giskard Challenge Solver
This project is a solver for Giskard AI challenges. It uses various AI services to generate prompts and solve challenges by interacting with the Giskard API.

## Features
- Supports multiple AI services: OpenAI, Anthropic, Mistral, and Ollama.
- Automatically switches between AI services.
- Pauses and resumes execution with keyboard controls.
- Dockerized for easy deployment.

## Installation
1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/GiskardRedSolver.git
   cd GiskardRedSolver
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and fill in your API keys:

   ```bash
   cp .env.example .env
   ```

## Documentation

For detailed information on setup, usage, and troubleshooting, refer to the [Documentation](docs/DOCUMENTATION.md).

## Usage

### Running Locally
Start the application:

```bash
npm start
```

### Running with Docker
Build and run the Docker container:

```bash
docker-compose up --build
```

In a separate terminal, pull the required Ollama models:

```bash
docker-compose exec ollama ollama pull llama2:3.3
docker-compose exec ollama ollama pull deepseek-coder:14b
docker-compose exec ollama ollama pull llama2:3.1-8b
docker-compose exec ollama ollama pull mistral:7b
```

## Keyboard Controls
- `p`: Pause/Resume the solver.
- `s`: Switch AI service (only when paused).
- `q`: Quit the application.

## License
This project is licensed under the [MIT License](LICENSE).
