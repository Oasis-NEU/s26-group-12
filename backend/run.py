#!/usr/bin/env python3
"""
Run the FastAPI backend server
Usage: python run.py
"""

import uvicorn
import sys
import os

# Add backend to path
sys.path.insert(0, os.path.dirname(__file__))

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
