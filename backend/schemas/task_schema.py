from typing import Optional
from pydantic import BaseModel


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    priority: str = "Medium"
    status: str = "Todo"
    due_date: Optional[str] = None