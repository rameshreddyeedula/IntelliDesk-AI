from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    priority = Column(String(20), default="Medium")
    status = Column(String(20), default="Pending")
    category = Column(String(50), default="General")
    due_date = Column(String(20), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)