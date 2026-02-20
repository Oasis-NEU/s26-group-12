from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db, RatingDB, ClubDB, UserDB
from app.models import RatingResponse, RatingCreate
from typing import List

router = APIRouter(prefix="/api/ratings", tags=["ratings"])

@router.post("/", response_model=RatingResponse)
def create_rating(
    rating: RatingCreate,
    db: Session = Depends(get_db)
):
    """Create a new rating for a club"""
    
    # Check if club exists
    club = db.query(ClubDB).filter(ClubDB.club_id == rating.club_id).first()
    if not club:
        raise HTTPException(status_code=404, detail="Club not found")
    
    # Check if user exists
    user = db.query(UserDB).filter(UserDB.user_id == rating.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Validate rating score
    if rating.rating_score < 1 or rating.rating_score > 10:
        raise HTTPException(status_code=400, detail="Rating score must be between 1 and 10")
    
    # Check if user already rated this club
    existing_rating = db.query(RatingDB).filter(
        RatingDB.club_id == rating.club_id,
        RatingDB.user_id == rating.user_id
    ).first()
    
    if existing_rating:
        # Update existing rating
        existing_rating.rating_score = rating.rating_score
        existing_rating.review_text = rating.review_text
    else:
        # Create new rating
        db_rating = RatingDB(**rating.dict())
        db.add(db_rating)
    
    # Update club's average rating
    club_ratings = db.query(func.avg(RatingDB.rating_score)).filter(
        RatingDB.club_id == rating.club_id
    ).scalar()
    club_count = db.query(func.count(RatingDB.rating_id)).filter(
        RatingDB.club_id == rating.club_id
    ).scalar()
    
    club.average_rating = float(club_ratings) if club_ratings else 0.0
    club.number_of_ratings = club_count or 0
    
    db.commit()
    
    if existing_rating:
        db.refresh(existing_rating)
        return existing_rating
    else:
        db.refresh(db_rating)
        return db_rating

@router.get("/{rating_id}", response_model=RatingResponse)
def get_rating(rating_id: int, db: Session = Depends(get_db)):
    """Get a specific rating by ID"""
    rating = db.query(RatingDB).filter(RatingDB.rating_id == rating_id).first()
    if not rating:
        raise HTTPException(status_code=404, detail="Rating not found")
    return rating

@router.get("/club/{club_id}", response_model=List[RatingResponse])
def get_club_ratings(club_id: int, db: Session = Depends(get_db)):
    """Get all ratings for a club"""
    ratings = db.query(RatingDB).filter(RatingDB.club_id == club_id).all()
    return ratings
