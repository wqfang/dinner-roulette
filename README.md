# 🎡 Dinner Roulette (Chinese Food Edition)

A full-stack web application designed to solve the "What should we eat?" dilemma. This project uses a smooth, physics-based spin wheel to randomly select a meal from a curated list of Chinese delicacies.

## 🚀 Tech Stack

- **Backend:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.12)
- **Frontend:** HTML5, CSS3 (Conic Gradients), Vanilla JavaScript
- **Package Management:** [uv](https://github.com/astral-sh/uv)
- **Deployment:** Docker & Docker Compose

## 🛠️ Project Structure

```text
dinner-roulette/
├── app/
│   ├── api/            # FastAPI routes & logic
│   ├── static/         # Frontend (HTML/CSS/JS)
│   └── main.py         # Application entry point
├── Dockerfile          # Container configuration
├── docker-compose.yml  # Orchestration
└── pyproject.toml      # Modern Python dependencies
```

## 📝 Next Step
1. Change the background image of the entire webpage
2. Add background music and make it auto play when the page loads (not sure if this is viable)
3. Add images of each food to the slices
4. Add a popup animation when the winner is selected
5. Deploy it on my new domain
