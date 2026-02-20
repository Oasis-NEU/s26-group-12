# ⚡ Quick Start Guide

## 🎯 Get Running in 5 Minutes

### For Windows Users:
```bash
# Terminal 1: Start Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

```bash
# Terminal 2: Start Frontend
npm install
npm run dev
```

Then open: [http://localhost:5173](http://localhost:5173)

---

### For Mac/Linux Users:
```bash
# Terminal 1: Start Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

```bash
# Terminal 2: Start Frontend
npm install
npm run dev
```

Then open: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Test the API Directly

With the backend running, visit:
**[http://localhost:8000/docs](http://localhost:8000/docs)**

Try these endpoints:
1. **GET** `/api/clubs/` - Get all clubs
2. **GET** `/api/clubs/search?q=Robotics` - Add query parameter
3. **GET** `/health` - Health check

---

## 📁 Key Files You'll Edit

**Frontend:**
- `src/Pages/LandingPage.tsx` - Landing page UI
- `src/Pages/ClubViewPage.tsx` - Club results page
- `src/Presets/ClubCard.tsx` - Club card display
- `src/api/client.ts` - Backend API calls

**Backend:**
- `backend/app/routes/clubs.py` - Club endpoints
- `backend/app/routes/ratings.py` - Rating endpoints
- `backend/app/routes/auth.py` - Auth endpoints
- `backend/app/seed_data.py` - Default clubs

---

## 🔄 Frontend-Backend Flow

```
User Types in Search Bar
         ↓
LandingPage calls onSearchClub()
         ↓
App.tsx switches to ClubViewPage
         ↓
ClubViewPage fetches clubAPI.searchClubs()
         ↓
API Client (src/api/client.ts) makes HTTP request
         ↓
Backend receives GET /api/clubs/search?q=...
         ↓
Backend queries database & returns results
         ↓
Frontend displays clubs in ClubCard components
```

---

## ✅ Week 1 Deliverables (DONE)

- ✅ Landing page with search bar
- ✅ Club display cards  
- ✅ Search functionality
- ✅ Backend FastAPI setup
- ✅ Database with 20 clubs
- ✅ API endpoints for clubs

---

## ✅ Week 2 Deliverables (DONE)

- ✅ User registration API
- ✅ User login API
- ✅ Rating system (1-10)
- ✅ Review text support
- ✅ Average rating calculation
- ✅ API documentation

---

## 🚀 Next: Week 2 UI Implementation

1. **Create Login Modal**
   - File: `src/Pages/LoginPage.tsx`
   - Use `authAPI.login()` from client.ts

2. **Create Rating Modal**
   - File: `src/Presets/RatingModal.tsx`
   - Use `ratingAPI.createRating()` from client.ts

3. **Add User State**
   - File: Create `src/context/UserContext.tsx`
   - Track logged-in user

4. **Update ClubCard**
   - Add rating button
   - Show user's existing rating
   - Allow rating updates

---

## 📊 Database Schema

```
CLUBS
├── club_id (int, primary key)
├── name (string)
├── category (string)
├── description (text)
├── days_meet (string, comma-separated)
├── average_rating (float)
└── number_of_ratings (int)

USERS
├── user_id (int, primary key)
├── email (string, unique)
├── username (string)
├── password (string, hashed)
├── is_northeastern_student (bool)
└── created_at (datetime)

RATINGS
├── rating_id (int, primary key)
├── club_id (int, foreign key)
├── user_id (int, foreign key)
├── rating_score (int, 1-10)
├── review_text (text, optional)
├── created_at (datetime)
└── updated_at (datetime)
```

---

## 🔐 Authentication Flow (To Implement)

1. User clicks "Sign Up"
2. Form submits to `authAPI.register(email, username, password)`
3. Backend creates user in database
4. Response includes `user_id`
5. Store `user_id` in React state or localStorage
6. Use `user_id` when creating ratings

---

## 📦 Dependencies Installed

**Frontend:**
```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.0",
  "axios": "^1.6.7"
}
```

**Backend:**
- fastapi
- uvicorn
- sqlalchemy
- pydantic

---

## 🆘 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Cannot find module 'axios'" | Run `npm install` |
| "ModuleNotFoundError: No module named 'fastapi'" | Run `pip install -r requirements.txt` |
| "Connection refused" | Backend not running - check port 8000 |
| "Database locked" | Delete `backend/clubs.db` and restart backend |
| "CORS error" | Ensure backend is at `http://localhost:8000` |

---

## 💻 Command Reference

```bash
# Frontend commands
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Check code style

# Backend commands (from backend/ folder)
pip install -r requirements.txt   # Install dependencies
python run.py                     # Start server
python -m pytest                  # Run tests (when added)
```

---

## 📚 Full Documentation

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for:
- Detailed setup instructions
- API endpoint documentation
- Database information
- Troubleshooting guide

---

## 🎉 You're All Set!

Start both servers and visit [http://localhost:5173](http://localhost:5173)

**Questions?** Check the SETUP_GUIDE.md or the API docs at [http://localhost:8000/docs](http://localhost:8000/docs)
