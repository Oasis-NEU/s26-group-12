# Rate My Club - Backend Setup

## Installation

1. Install Python (3.8 or higher)
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate virtual environment:
   - **Windows**: `venv\Scripts\activate`
   - **Mac/Linux**: `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Backend

From the `backend` directory, run:
```bash
python run.py
```

The API will be available at `http://localhost:8000`

### API Documentation
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Clubs
- `GET /api/clubs/` - Get all clubs
- `GET /api/clubs/search?q=search_term` - Search clubs
- `GET /api/clubs/{club_id}` - Get specific club
- `GET /api/clubs/{club_id}/ratings` - Get club ratings

### Ratings
- `POST /api/ratings/` - Create/update a rating
- `GET /api/ratings/{rating_id}` - Get specific rating
- `GET /api/ratings/club/{club_id}` - Get all ratings for club

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user/{user_id}` - Get user info

## Development Notes

- Database is SQLite (clubs.db) - stored in backend directory
- CORS is enabled for frontend on `localhost:5173` and `localhost:3000`
- Password hashing is basic (use bcrypt in production)
- JWT tokens are placeholders (implement in production)
