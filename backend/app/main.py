from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import init_db
from app.routes import clubs_router, ratings_router, auth_router
from app.seed_data import seed_clubs

app = FastAPI(
    title="Rate My Club - Northeastern",
    description="API for rating and reviewing Northeastern clubs",
    version="1.0.0"
)

# Add CORS middleware to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],  # Allow Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
init_db()

# Include routers
app.include_router(clubs_router)
app.include_router(ratings_router)
app.include_router(auth_router)

@app.on_event("startup")
def startup_event():
    """Load seed data on startup"""
    seed_clubs()

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Backend is running!"}

@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Rate My Club API",
        "docs": "Visit /docs for API documentation"
    }
