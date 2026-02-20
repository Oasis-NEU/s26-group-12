from app.database import SessionLocal, ClubDB

# Comprehensive list of Northeastern clubs
NORTHEASTERN_CLUBS = [
    {
        "name": "Robotics Club",
        "category": "STEM",
        "description": "Build and program robots to compete in regional and national competitions. No experience required!",
        "days_meet": "Monday,Wednesday"
    },
    {
        "name": "Debate Team",
        "category": "Professional",
        "description": "Sharpen your critical thinking and public speaking skills through competitive debate tournaments.",
        "days_meet": "Thursday,Friday"
    },
    {
        "name": "Jazz Ensemble",
        "category": "Arts & Music",
        "description": "Join our jazz ensemble to perform at school events and collaborate with other musicians.",
        "days_meet": "Tuesday,Thursday"
    },
    {
        "name": "Cycling Club",
        "category": "Sports & Recreation",
        "description": "Experience the thrill of cycling with fellow enthusiasts. All skill levels welcome!",
        "days_meet": "Saturday,Sunday"
    },
    {
        "name": "Community Service Leaders",
        "category": "Service & Volunteer",
        "description": "Organize and participate in community service events to make a positive impact.",
        "days_meet": "Wednesday"
    },
    {
        "name": "Artificial Intelligence Society",
        "category": "STEM",
        "description": "Explore cutting-edge AI technologies, machine learning, and their real-world applications.",
        "days_meet": "Monday,Friday"
    },
    {
        "name": "Philosophy Club",
        "category": "Social",
        "description": "Discuss fundamental questions about life, ethics, and human existence.",
        "days_meet": "Tuesday"
    },
    {
        "name": "Esports Team",
        "category": "Gaming & Esports",
        "description": "Compete in League of Legends, Valorant, CS:GO, and other competitive gaming titles.",
        "days_meet": "Monday,Wednesday,Friday"
    },
    {
        "name": "Environmental Action Club",
        "category": "Service & Volunteer",
        "description": "Work on sustainability initiatives and environmental awareness on campus.",
        "days_meet": "Thursday"
    },
    {
        "name": "Model United Nations",
        "category": "Professional",
        "description": "Represent countries and debate global issues at MUN conferences.",
        "days_meet": "Tuesday,Thursday"
    },
    {
        "name": "Fitness & Wellness Club",
        "category": "Health & Wellness",
        "description": "Group workouts, health coaching, and wellness activities for all fitness levels.",
        "days_meet": "Monday,Wednesday,Friday"
    },
    {
        "name": "Muslim Students Association",
        "category": "Religious & Spiritual",
        "description": "Faith-based community supporting Islamic practices and interfaith dialogue.",
        "days_meet": "Friday"
    },
    {
        "name": "Photography Club",
        "category": "Arts & Music",
        "description": "Learn and share photography techniques and collaborate on creative projects.",
        "days_meet": "Wednesday"
    },
    {
        "name": "Startup Entrepreneurs",
        "category": "Professional",
        "description": "Network with aspiring entrepreneurs and launch your startup ideas.",
        "days_meet": "Monday,Thursday"
    },
    {
        "name": "Rock Climbing Club",
        "category": "Sports & Recreation",
        "description": "Indoor and outdoor rock climbing for all levels. Equipment provided!",
        "days_meet": "Tuesday,Saturday"
    },
    {
        "name": "Graduate Teaching Fellows",
        "category": "Academic",
        "description": "Support and community for graduate students teaching courses.",
        "days_meet": "Thursday"
    },
    {
        "name": "Data Science Club",
        "category": "STEM",
        "description": "Learn data analysis, visualization, and machine learning with Python and R.",
        "days_meet": "Wednesday,Friday"
    },
    {
        "name": "Investment Club",
        "category": "Professional",
        "description": "Learn about stock markets, investing strategies, and portfolio management.",
        "days_meet": "Monday"
    },
    {
        "name": "International Students Association",
        "category": "Social",
        "description": "Community and support network for international students at Northeastern.",
        "days_meet": "Tuesday,Thursday"
    },
    {
        "name": "Board Game Society",
        "category": "Gaming & Esports",
        "description": "Play and discuss a wide variety of board games with fellow enthusiasts.",
        "days_meet": "Friday,Saturday"
    }
]

def seed_clubs():
    """Load default clubs into database if empty"""
    db = SessionLocal()
    try:
        # Check if clubs already exist
        existing_clubs = db.query(ClubDB).count()
        if existing_clubs > 0:
            return
        
        # Add all clubs
        for club_data in NORTHEASTERN_CLUBS:
            club = ClubDB(
                name=club_data["name"],
                category=club_data["category"],
                description=club_data["description"],
                days_meet=club_data["days_meet"],
                number_of_ratings=0,
                average_rating=0.0
            )
            db.add(club)
        
        db.commit()
        print(f"Seeded {len(NORTHEASTERN_CLUBS)} clubs into database")
    except Exception as e:
        print(f"Error seeding clubs: {e}")
        db.rollback()
    finally:
        db.close()
