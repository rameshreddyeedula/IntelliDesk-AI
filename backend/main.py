from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from models.task import Task
from routes.task_routes import router as task_router
from routes.ai_routes import router as ai_router
from models.user import User
from routes.auth_routes import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="IntelliDesk AI API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(task_router)
app.include_router(ai_router)
app.include_router(auth_router)


@app.get("/")
def root():
    return {"message": "IntelliDesk AI API is running"}