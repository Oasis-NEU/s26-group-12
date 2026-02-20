# 🏗️ Technical Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│  React 19 + TypeScript + Vite (localhost:5173)              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Pages: LandingPage, ClubViewPage                     │   │
│  │ Components: ClubCard, ClubFilter                     │   │
│  │ API Client: src/api/client.ts (Axios)               │   │
│  │ State: App.tsx (Navigation & Search)                │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                   HTTP Requests/Responses
                    (CORS Enabled)
                         │
┌────────────────────────▼────────────────────────────────────┐
│                      API LAYER                              │
│  FastAPI (localhost:8000)                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Routes:                                              │   │
│  │  • /api/clubs/ - GET all, search, filter            │   │
│  │  • /api/ratings/ - POST create, GET list            │   │
│  │  • /api/auth/ - POST register/login, GET user       │   │
│  │                                                      │   │
│  │ Features:                                            │   │
│  │  • CORS middleware enabled                           │   │
│  │  • Automatic API documentation (/docs)              │   │
│  │  • Health check endpoint                             │   │
│  │  • Error handling & validation                       │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                  ORM Queries (SQLAlchemy)
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    DATABASE LAYER                            │
│  SQLite (clubs.db)                                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Tables:                                              │   │
│  │  • clubs (20 seeded, auto-load on startup)          │   │
│  │  • users (registration & authentication)             │   │
│  │  • ratings (user ratings with reviews)               │   │
│  │                                                      │   │
│  │ Relationships:                                       │   │
│  │  • clubs ← → ratings → users                         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Runtime | React | 19.2.4 | UI framework |
| Language | TypeScript | 5.9.3 | Type-safe JavaScript |
| Build Tool | Vite | 7.2.4 | Fast dev server & bundler |
| HTTP Client | Axios | 1.6.7 | API communication |
| Styling | Inline CSS + CSS-in-JS | — | Component styling |

### Backend
| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | FastAPI | 0.104.1 | Python web framework |
| Server | Uvicorn | 0.24.0 | ASGI server |
| ORM | SQLAlchemy | 2.0.23 | Database abstraction |
| Validation | Pydantic | 2.5.0 | Data validation |
| Database | SQLite | — | Local development DB |

---

## Data Flow Diagram

### Search Functionality
```
User Input (Search Bar)
    ↓
LandingPage.handleSearch()
    ↓
App.tsx receives searchString
    ↓
Routes to ClubViewPage
    ↓
ClubViewPage calls clubAPI.searchClubs(query)
    ↓
[HTTP GET] /api/clubs/search?q=robotics
    ↓
FastAPI route receives request
    ↓
SQLAlchemy queries database
    ↓
Returns matching clubs as JSON
    ↓
Frontend renders ClubCard components
    ↓
User sees results
```

### Rating Submission
```
User clicks "Rate" on ClubCard
    ↓
RatingModal opens (to be implemented)
    ↓
User enters score (1-10) + review
    ↓
Calls ratingAPI.createRating()
    ↓
[HTTP POST] /api/ratings/
    ↓
Backend validates data
    ↓
Creates or updates rating in database
    ↓
Recalculates club average rating
    ↓
Returns updated rating
    ↓
Frontend updates display
    ↓
User sees their rating
```

---

## API Endpoint Details

### Clubs Endpoints
```
GET /api/clubs/
├─ Description: Get all clubs
├─ Response: List of Club objects
└─ Status Codes: 200 OK

GET /api/clubs/search?q=<query>
├─ Description: Search clubs by name, category, description
├─ Parameters: q (search term, required)
├─ Response: List of matching Club objects
└─ Status Codes: 200 OK

GET /api/clubs/<club_id>
├─ Description: Get specific club by ID
├─ Response: Club object
└─ Status Codes: 200 OK, 404 Not Found

GET /api/clubs/<club_id>/ratings
├─ Description: Get all ratings for a club
├─ Response: Club details + list of ratings
└─ Status Codes: 200 OK, 404 Not Found
```

### Ratings Endpoints
```
POST /api/ratings/
├─ Description: Create or update a rating
├─ Request Body: { club_id, user_id, rating_score (1-10), review_text? }
├─ Response: Created/Updated Rating object
└─ Status Codes: 200 OK, 400 Bad Request, 404 Not Found

GET /api/ratings/<rating_id>
├─ Description: Get specific rating
├─ Response: Rating object
└─ Status Codes: 200 OK, 404 Not Found

GET /api/ratings/club/<club_id>
├─ Description: Get all ratings for a club
├─ Response: List of Rating objects
└─ Status Codes: 200 OK, 404 Not Found
```

### Authentication Endpoints
```
POST /api/auth/register
├─ Description: Register new user
├─ Request: { email, username, password, is_northeastern_student? }
├─ Response: User object with user_id
└─ Status Codes: 201 Created, 400 Bad Request

POST /api/auth/login
├─ Description: Login user
├─ Parameters: username, password (query params)
├─ Response: { user_id, username, email, token }
└─ Status Codes: 200 OK, 401 Unauthorized

GET /api/auth/user/<user_id>
├─ Description: Get user info
├─ Response: User object
└─ Status Codes: 200 OK, 404 Not Found
```

---

## Component Communication

### React Component Hierarchy
```
App
├── LandingPage
│   └── SearchBar
└── ClubViewPage
    ├── Header (with search & filters)
    ├── ClubSearchFilters
    │   └── Filter options
    └── ClubCard (repeated for each club)
        ├── Rating display
        ├── Club info
        └── Days meet [To Add: Rate button]
```

### State Management
```
App.tsx (Top-level state)
├── page: "landing" | "clubview"
├── selectedClub: Club | null
├── searchString: string
└── [To Add] currentUser: User | null
```

### API Client Structure
```
src/api/client.ts
├── import axios
├── Create axios instance
├── Export clubAPI { getAllClubs, searchClubs, getClubById }
├── Export ratingAPI { createRating, getClubRatings, getRatingById }
└── Export authAPI { register, login, getUser }
```

---

## Database Schema

### Clubs Table
```sql
CREATE TABLE clubs (
    club_id INTEGER PRIMARY KEY,
    name VARCHAR UNIQUE NOT NULL,
    category VARCHAR NOT NULL,
    description TEXT NOT NULL,
    days_meet VARCHAR,                    -- Comma-separated days
    number_of_ratings INTEGER DEFAULT 0,
    average_rating FLOAT DEFAULT 0.0,
    created_at DATETIME DEFAULT NOW()
);
```

### Users Table
```sql
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,            -- Hashed
    is_northeastern_student BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT NOW()
);
```

### Ratings Table
```sql
CREATE TABLE ratings (
    rating_id INTEGER PRIMARY KEY,
    club_id INTEGER FOREIGN KEY REFERENCES clubs,
    user_id INTEGER FOREIGN KEY REFERENCES users,
    rating_score INTEGER CHECK (rating_score >= 1 AND rating_score <= 10),
    review_text TEXT,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_user_club_rating 
    ON ratings(user_id, club_id);     -- One rating per user per club
```

---

## Error Handling Strategy

### Backend Error Responses
```python
# 400 - Bad Request
{
    "detail": "Rating score must be between 1 and 10"
}

# 404 - Not Found
{
    "detail": "Club not found"
}

# 401 - Unauthorized (future)
{
    "detail": "Invalid credentials"
}
```

### Frontend Error Handling
```typescript
try {
    const clubs = await clubAPI.getAllClubs();
} catch (error) {
    if (error.response?.status === 404) {
        // Handle not found
    } else if (error.response?.status === 400) {
        // Handle bad request
    } else {
        // Handle network error
    }
    setError("Failed to load clubs");
}
```

---

## Performance Considerations

### Database
- SQLite adequate for development/MVP
- Should migrate to PostgreSQL for production
- Index on club names for faster search
- Unique constraint on user+club for ratings

### Frontend
- API responses are small (club list ~5KB)
- Search happens at backend (efficient)
- Ratings are cached in state
- Consider pagination for large result sets

### Network
- All API calls use HTTP/HTTPS
- CORS enabled for cross-origin requests
- Response caching can be added later

---

## Security Notes (Production)

### Current State (Development)
- ⚠️ Passwords hashed with basic SHA-256 (not secure)
- ⚠️ No JWT tokens (using placeholder)
- ⚠️ No rate limiting
- ⚠️ No input sanitization beyond Pydantic
- ✅ CORS configured for local development

### TODO for Production
- [ ] Use bcrypt for password hashing
- [ ] Implement JWT with expiration
- [ ] Add rate limiting per IP
- [ ] Validate Northeastern email domains
- [ ] Add HTTPS
- [ ] Add request validation middleware
- [ ] Implement CORS properly (whitelist origins)
- [ ] Add request logging/monitoring

---

## Development Workflow

### File Watching
- **Frontend:** Vite automatically reloads on file changes
- **Backend:** Uvicorn with `reload=True` (auto-reloads on file changes)

### Debugging
- **Frontend:** Use browser DevTools (F12)
- **Backend:** Check terminal output or add print statements
- **API Testing:** Use Swagger UI at `/docs`

### Database Debugging
- **View data:** Use SQLite browser or command-line
- **Reset:** Delete `clubs.db` and restart backend
- **Seed new data:** Modify `seed_data.py`

---

## Deployment Considerations

### Frontend Deployment
- Build: `npm run build` → outputs `dist/`
- Host on: Vercel, Netlify, GitHub Pages, AWS S3, or any static host
- Environment variable: Update `API_BASE_URL` in `client.ts`

### Backend Deployment
- Platform options: Heroku, Railway, Render, AWS, DigitalOcean
- Database: Migrate to PostgreSQL
- Environment variables: Database URL, allowed origins
- Consider Docker containerization

### Full-Stack Deployment
- Option 1: Serve frontend from backend FastAPI
- Option 2: Deploy separately (frontend on Vercel, backend on Railway)
- Option 3: Docker Compose for local development

---

## Testing Strategy (Future)

### Frontend Testing
```typescript
// Unit tests with Vitest
test('Search input updates state', () => { ... })

// Component tests with React Testing Library
test('ClubCard displays club name', () => { ... })

// Integration tests
test('Search flow works end-to-end', () => { ... })
```

### Backend Testing
```python
# Unit tests with pytest
def test_club_search():
    response = client.get("/api/clubs/search?q=robotics")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_rating_validation():
    assert_invalid_score(0)     # Too low
    assert_invalid_score(11)    # Too high
```

---

## Key Decisions Made

1. **SQLite for Development**: Simple setup, file-based, portable
2. **Axios Client**: Promises-based, widely used, minimal setup
3. **FastAPI**: Modern async framework, automatic validation, great docs
4. **Pydantic Models**: Declarative, validated request/response bodies
5. **Inline Styling**: No CSS complexity needed for MVP
6. **Seed Data**: Auto-loaded on startup for demo convenience

---

## Future Architecture Improvements

- [ ] Add middleware for logging/monitoring
- [ ] Implement caching layer (Redis)
- [ ] Add message queue for async tasks (Celery)
- [ ] Implement GraphQL alongside REST
- [ ] Add API versioning strategy
- [ ] Create service layer for business logic
- [ ] Add repository pattern for data access
- [ ] Implement event-driven architecture

---

Last Updated: February 20, 2026
