from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ClubBase(BaseModel):
    name: str
    category: str
    description: str
    days_meet: List[str] = []
    
class Club(ClubBase):
    club_id: int
    number_of_ratings: int = 0
    average_rating: float = 0.0
    created_at: datetime
    
    class Config:
        from_attributes = True

class ClubResponse(BaseModel):
    club_id: int
    name: str
    category: str
    description: str
    days_meet: List[str]
    number_of_ratings: int
    average_rating: float
