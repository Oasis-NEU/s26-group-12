from .clubs import router as clubs_router
from .ratings import router as ratings_router
from .auth import router as auth_router

__all__ = ["clubs_router", "ratings_router", "auth_router"]
