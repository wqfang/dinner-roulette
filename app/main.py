from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.api.endpoints import router as api_router

app = FastAPI(title="今天晚上吃什么")
# Include the API router
app.include_router(api_router, prefix="/api")
# Mount the static files directory
app.mount("/", StaticFiles(directory="app/static", html=True), name="static")
