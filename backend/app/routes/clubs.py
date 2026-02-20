from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from app.database import get_db, ClubDB, RatingDB
from app.models import ClubResponse
from typing import List

router = APIRouter(prefix="/api/clubs", tags=["clubs"])

def _split_days(days_meet: str | list | None) -> list[str]:
    if not days_meet:
        return []
    if isinstance(days_meet, list):
        return days_meet
    return [day for day in days_meet.split(",") if day]

def _serialize_club(club: ClubDB) -> dict:
    return {
        "club_id": club.club_id,
        "name": club.name,
        "category": club.category,
        "description": club.description,
        "days_meet": _split_days(club.days_meet),
        "number_of_ratings": club.number_of_ratings,
        "average_rating": club.average_rating,
    }

@router.get("/", response_model=List[ClubResponse])
def get_all_clubs(db: Session = Depends(get_db)):
    """Get all clubs from database"""
    clubs = db.query(ClubDB).all()
    return [_serialize_club(club) for club in clubs]

@router.get("/search", response_model=List[ClubResponse])
def search_clubs(
    q: str = Query(..., min_length=1),
    db: Session = Depends(get_db)
):
    """Search clubs by name or category"""
    search_term = f"%{q}%"
    clubs = db.query(ClubDB).filter(
        or_(
            ClubDB.name.ilike(search_term),
            ClubDB.category.ilike(search_term),
            ClubDB.description.ilike(search_term)
        )
    ).all()
    return [_serialize_club(club) for club in clubs]

@router.get("/{club_id}", response_model=ClubResponse)
def get_club(club_id: int, db: Session = Depends(get_db)):
    """Get a specific club by ID"""
    club = db.query(ClubDB).filter(ClubDB.club_id == club_id).first()
    if not club:
        raise HTTPException(status_code=404, detail="Club not found")
    return _serialize_club(club)

@router.get("/{club_id}/ratings")
def get_club_ratings(club_id: int, db: Session = Depends(get_db)):
    """Get all ratings for a specific club"""
    club = db.query(ClubDB).filter(ClubDB.club_id == club_id).first()
    if not club:
        raise HTTPException(status_code=404, detail="Club not found")
    
    ratings = db.query(RatingDB).filter(RatingDB.club_id == club_id).all()
    return {
        "club_id": club_id,
        "club_name": club.name,
        "ratings": [
            {
                "rating_id": rating.rating_id,
                "club_id": rating.club_id,
                "user_id": rating.user_id,
                "rating_score": rating.rating_score,
                "review_text": rating.review_text,
                "created_at": rating.created_at,
                "updated_at": rating.updated_at,
            }
            for rating in ratings
        ],
        "total_ratings": len(ratings),
        "average_rating": club.average_rating
    }
