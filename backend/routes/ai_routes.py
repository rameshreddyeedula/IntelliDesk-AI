from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.ai_service import analyze_task

router = APIRouter(
    prefix="/ai",
    tags=["AI Assistant"]
)


class TaskAnalysisRequest(BaseModel):
    task: str


@router.post("/analyze")
def analyze_task_route(request: TaskAnalysisRequest):
    try:
        result = analyze_task(request.task)

        return result

    except Exception as error:
        print("AI Error:", error)

        raise HTTPException(
            status_code=500,
            detail="AI analysis failed"
        )