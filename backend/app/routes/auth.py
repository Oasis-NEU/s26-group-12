from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db, UserDB
from app.models import UserCreate, UserResponse
import hashlib

router = APIRouter(prefix="/api/auth", tags=["auth"])

def hash_password(password: str) -> str:
    """Simple password hashing - use bcrypt in production"""
    return hashlib.sha256(password.encode()).hexdigest()

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    
    # Check if user already exists
    existing_user = db.query(UserDB).filter(
        (UserDB.email == user.email) | (UserDB.username == user.username)
    ).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )
    
    # Create new user
    db_user = UserDB(
        email=user.email,
        username=user.username,
        password=hash_password(user.password),
        is_northeastern_student=user.is_northeastern_student
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

@router.post("/login")
def login_user(username: str, password: str, db: Session = Depends(get_db)):
    """Login user - returns user data and session token"""
    
    user = db.query(UserDB).filter(UserDB.username == username).first()
    
    if not user or user.password != hash_password(password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    return {
        "user_id": user.user_id,
        "username": user.username,
        "email": user.email,
        "is_northeastern_student": user.is_northeastern_student,
        "token": f"token_{user.user_id}"  # Placeholder - use JWT in production
    }

@router.get("/user/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get user info by ID"""
    user = db.query(UserDB).filter(UserDB.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
