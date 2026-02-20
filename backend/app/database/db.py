from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os

DATABASE_URL = "sqlite:///./clubs.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class ClubDB(Base):
    __tablename__ = "clubs"
    
    club_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)
    category = Column(String)
    description = Column(Text)
    days_meet = Column(String)  # Stored as comma-separated
    number_of_ratings = Column(Integer, default=0)
    average_rating = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    ratings = relationship("RatingDB", back_populates="club")

class UserDB(Base):
    __tablename__ = "users"
    
    user_id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True, unique=True)
    username = Column(String, index=True)
    password = Column(String)  # In production, use proper hashing
    is_northeastern_student = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    ratings = relationship("RatingDB", back_populates="user")

class RatingDB(Base):
    __tablename__ = "ratings"
    
    rating_id = Column(Integer, primary_key=True, index=True)
    club_id = Column(Integer, ForeignKey("clubs.club_id"))
    user_id = Column(Integer, ForeignKey("users.user_id"))
    rating_score = Column(Integer)  # 1-10
    review_text = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    club = relationship("ClubDB", back_populates="ratings")
    user = relationship("UserDB", back_populates="ratings")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=engine)
