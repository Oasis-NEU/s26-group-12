# 🎓 Rate My Club - Complete Setup Guide

## Project Structure

```
s26-group-12/
├── frontend/                 (React/TypeScript with Vite)
│   ├── src/
│   │   ├── api/
│   │   │   └── client.ts    (API communication layer)
│   │   ├── Classes/
│   │   ├── Pages/
│   │   ├── Presets/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── backend/                  (Python with FastAPI)
    ├── app/
    │   ├── models/          (Pydantic models)
    │   │   ├── club.py
    │   │   ├── user.py
    │   │   ├── rating.py
    │   │   └── __init__.py
    │   ├── routes/          (API endpoints)
    │   │   ├── clubs.py
    │   │   ├── ratings.py
    │   │   ├── auth.py
    │   │   └── __init__.py
    │   ├── database/        (Database configuration)
    │   │   ├── db.py
    │   │   └── __init__.py
    │   ├── main.py          (FastAPI app)
    │   ├── seed_data.py     (Default club data)
    │   └── __init__.py
    ├── run.py               (Start server)
    ├── requirements.txt     (Python dependencies)
    └── README.md
```

---

## 📋 Setup Instructions

### **PART 1: Backend Setup (Python/FastAPI)**

#### Step 1: Install Python
- Download Python 3.9+ from [python.org](https://www.python.org)
- Ensure `python` and `pip` are in your PATH

#### Step 2: Create Virtual Environment
```bash
cd backend
python -m venv venv
```

**Activate Virtual Environment:**

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

#### Step 3: Install Python Dependencies
```bash
pip install -r requirements.txt
```

#### Step 4: Start the Backend Server
```bash
python run.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 [Press ENTER to quit]
```

**Test the backend:**
- Visit [http://localhost:8000/docs](http://localhost:8000/docs) in your browser for interactive API documentation
- Visit [http://localhost:8000/health](http://localhost:8000/health) for a health check

---

### **PART 2: Frontend Setup (React/TypeScript)**

#### Step 1: Install Node Dependencies
From the project root (not from the backend folder):

```bash
npm install
```

This will install axios for API communication.

#### Step 2: Start the Development Server
```bash
npm run dev
```

You should see:
```
VITE v7.2.4  ready in XXX ms

➜  Local:   http://localhost:5173/
```

---

## 🚀 Running Both Servers

<img src="https://via.placeholder.com/400x50/4CAF50/FFFFFF?text=Key+Requirement" />

**You MUST run BOTH servers for the app to work:**

### Terminal 1: Backend (FastAPI)
```bash
cd backend
python run.py
```

### Terminal 2: Frontend (React/Vite)
```bash
npm run dev
```

Then visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📚 API Endpoints (Week 1-2)

### Clubs
- `GET /api/clubs/` - Get all clubs
- `GET /api/clubs/search?q=search` - Search clubs
- `GET /api/clubs/{id}` - Get specific club
- `GET /api/clubs/{id}/ratings` - Get club ratings

### Ratings
- `POST /api/ratings/` - Create/update rating
- `GET /api/ratings/club/{club_id}` - Get all ratings for club

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user/{id}` - Get user info

**Full API documentation:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🎯 Week 1-2 Implementation Status

### ✅ Completed

**Backend:**
- FastAPI server setup
- Database models (Club, User, Rating)
- SQLite database with automatic initialization
- API endpoints for clubs, ratings, auth
- 20 Northeastern clubs pre-loaded
- CORS enabled for frontend communication

**Frontend:**
- API client layer with axios
- Landing page with search
- Club view page with search results
- Club cards with ratings display
- Filter system (ready to integrate)
- Auth UI skeleton

### 🔄 To Complete

**Backend:**
- Implement proper JWT authentication
- Add bcrypt password hashing
- Email verification for Northeastern domain
- Rate limiting
- Unit tests

**Frontend:**
- Login/signup form implementation
- Rating submission modal
- User authentication flow
- Comment system
- Like/dislike ratings

---

## 🔗 Frontend-Backend Communication

The frontend uses an API client (`src/api/client.ts`) that handles all backend communication:

```typescript
// Fetching clubs
const clubs = await clubAPI.getAllClubs();

// Searching
const results = await clubAPI.searchClubs("robotics");

// Creating a rating
const rating = await ratingAPI.createRating(
  clubId, userId, score, reviewText
);

// Authentication
await authAPI.login(username, password);
```

---

## 📱 Features Implemented

### ✨ MVP - Week 1
- [x] Search bar on landing page
- [x] Display all clubs from backend
- [x] Search functionality works with backend
- [x] Club display cards with ratings
- [x] Filter system UI (backend-ready)

### ⭐ MVP - Week 2
- [x] User registration API
- [x] User login API
- [x] Rating creation API (1-10 scale)
- [x] Review text support
- [x] Average rating calculation

### 🎁 Nice to Haves (Future)
- [ ] Like/dislike ratings
- [ ] Advanced filtering
- [ ] Comment system
- [ ] Club president management
- [ ] Detect inactive clubs
- [ ] User club connections

---

## 🐛 Troubleshooting

### Backend won't start
```
Error: Address already in use
```
**Solution:** Change port in `backend/run.py` or kill process on port 8000

### Frontend can't connect to backend
```
Error: CORS policy: No 'Access-Control-Allow-Origin'
```
**Solution:** Ensure backend is running on `http://localhost:8000`

### Database issues
```
Error: database is locked
```
**Solution:** Delete `backend/clubs.db` and restart the backend

### Python not found
```
'python' is not recognized
```
**Solution:** Install Python from [python.org](https://www.python.org) or use `python3` instead

---

## 📖 Database

The backend uses **SQLite** (`clubs.db`) stored in the backend folder. It automatically:
- Creates tables on first run
- Loads 20 Northeastern clubs
- Persists all ratings and user data

To reset the database:
```bash
# Delete the database file
rm backend/clubs.db  # Mac/Linux
del backend\clubs.db  # Windows

# Restart backend - it will recreate
python run.py
```

---

## 📝 Next Steps

1. **Test everything works:**
   - Verify both servers are running
   - Check [http://localhost:5173](http://localhost:5173)
   - Try searching for clubs

2. **Implement login/signup:**
   - Create auth forms in React
   - Connect to `POST /api/auth/register` and `POST /api/auth/login`

3. **Add rating submission:**
   - Create rating modal component
   - Generate unique user IDs or use login system
   - Submit ratings to `POST /api/ratings/`

4. **Improve styling:**
   - Add CSS modules or styled-components
   - Implement responsive design

---

## 💡 Development Tips

- Use `npm run dev` in one terminal and `python run.py` in another
- Check browser DevTools (F12) for network requests
- Use [http://localhost:8000/docs](http://localhost:8000/docs) to test API endpoints directly
- Check terminal output for debugging information

---

## 📧 Support

If you encounter issues:
1. Check the error message in console/terminal
2. Verify both servers are running
3. Try restarting both servers
4. Delete `backend/clubs.db` and restart backend

---

**Happy coding! 🚀**
