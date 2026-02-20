@echo off
REM Start both frontend and backend servers for Rate My Club

echo.
echo Starting Rate My Club - Northeastern
echo =====================================
echo.

REM Start backend in a new window
echo Starting Backend (Python)...
cd backend
start cmd /k "venv\Scripts\activate && python run.py"
cd ..

REM Give backend time to start
timeout /t 2

REM Start frontend
echo Starting Frontend (React)...
npm run dev

echo.
echo =====================================
echo Both servers should now be running!
echo Frontend: http://localhost:5173
echo Backend: http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo =====================================
