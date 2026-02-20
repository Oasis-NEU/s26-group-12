#!/bin/bash
# Start both frontend and backend servers for Rate My Club

echo "🚀 Starting Rate My Club - Northeastern"
echo "========================================="
echo ""

# Check if running on Windows
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    echo "Starting backend..."
    cd backend
    call venv\Scripts\activate.bat
    python run.py &
    cd ..
    
    echo "Starting frontend..."
    npm run dev
else
    # Mac/Linux
    echo "Starting backend..."
    cd backend
    source venv/bin/activate
    python run.py &
    BACKEND_PID=$!
    cd ..
    
    echo "Starting frontend..."
    npm run dev &
    
    echo ""
    echo "========================================="
    echo "✅ Both servers started!"
    echo "🌐 Frontend: http://localhost:5173"
    echo "🔧 Backend: http://localhost:8000"
    echo "📚 API Docs: http://localhost:8000/docs"
    echo "========================================="
fi
