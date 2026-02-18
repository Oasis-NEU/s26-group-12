export type ClubCategory = 
  | "Arts & Music"
  | "Service & Volunteer"
  | "Sports & Recreation"
  | "Professional"
  | "Religious & Spiritual"
  | "Greek Life"
  | "Political & Advocacy"
  | "STEM"
  | "Gaming & Esports"
  | "Health & Wellness"
  | "Social"
  | "Other";

export type meetDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday"

export type Club = {
    name: string,
    number_of_ratings: number,
    average_rating: number,
    club_id: number,
    club_category: ClubCategory,
    club_description: string,
    days_meet: meetDay[]
}

export const defaultClubs: Club[] = [
  {
    name: "Robotics Club",
    number_of_ratings: 47,
    average_rating: 4.6,
    club_id: 1,
    club_category: "STEM",
    days_meet: ["Monday", "Wednesday"],
    club_description: "Build and program robots to compete in regional and national competitions. No experience required!"
  },
  {
    name: "Debate Team",
    number_of_ratings: 32,
    average_rating: 4.3,
    club_id: 2,
    club_category: "Professional",
    days_meet: ["Thursday", "Friday"],
    club_description: "Sharpen your critical thinking and public speaking skills through competitive debate tournaments."
  },
  {
    name: "Jazz Ensemble",
    number_of_ratings: 21,
    average_rating: 4.8,
    club_id: 3,
    club_category: "Arts & Music",
    days_meet: ["Tuesday", "Thursday"],
    club_description: "Play jazz standards and original compositions alongside fellow musicians. All instruments welcome."
  },
  {
    name: "Alpha Phi Omega",
    number_of_ratings: 58,
    average_rating: 4.1,
    club_id: 4,
    club_category: "Greek Life",
    days_meet: ["Monday", "Wednesday", "Friday"],
    club_description: "A co-ed service fraternity dedicated to community service, leadership, and friendship."
  },
  {
    name: "Habitat for Humanity",
    number_of_ratings: 39,
    average_rating: 4.7,
    club_id: 5,
    club_category: "Service & Volunteer",
    days_meet: ["Monday", "Friday"],
    club_description: "Help build affordable housing in the local community. No construction experience needed."
  },
  {
    name: "Intramural Basketball",
    number_of_ratings: 74,
    average_rating: 4.4,
    club_id: 6,
    club_category: "Sports & Recreation",
    days_meet: ["Tuesday", "Thursday"],
    club_description: "Casual competitive basketball league open to all skill levels. Teams formed at the start of each semester."
  },
  {
    name: "Muslim Student Association",
    number_of_ratings: 28,
    average_rating: 4.9,
    club_id: 7,
    club_category: "Religious & Spiritual",
    days_meet: ["Friday"],
    club_description: "A welcoming community for Muslim students and anyone interested in learning about Islamic culture and faith."
  },
  {
    name: "Young Democrats",
    number_of_ratings: 19,
    average_rating: 3.8,
    club_id: 8,
    club_category: "Political & Advocacy",
    days_meet: ["Wednesday"],
    club_description: "Organize, campaign, and discuss progressive policy issues affecting students and the broader community."
  },
  {
    name: "Valorant Club",
    number_of_ratings: 63,
    average_rating: 4.2,
    club_id: 9,
    club_category: "Gaming & Esports",
    days_meet: ["Monday", "Thursday"],
    club_description: "Compete in ranked scrimmages and tournaments. Whether you're Iron or Radiant, all players are welcome."
  },
  {
    name: "Mindfulness & Meditation",
    number_of_ratings: 17,
    average_rating: 4.6,
    club_id: 10,
    club_category: "Health & Wellness",
    days_meet: ["Tuesday", "Friday"],
    club_description: "Learn guided meditation, breathing techniques, and stress management strategies for student life."
  },
  {
    name: "Photography Club",
    number_of_ratings: 25,
    average_rating: 4.5,
    club_id: 11,
    club_category: "Arts & Music",
    days_meet: ["Wednesday"],
    club_description: "Explore portrait, landscape, and street photography. Weekly photo walks and monthly gallery showcases."
  },
  {
    name: "Pre-Law Society",
    number_of_ratings: 44,
    average_rating: 4.0,
    club_id: 12,
    club_category: "Professional",
    days_meet: ["Monday", "Wednesday"],
    club_description: "Prepare for law school with LSAT workshops, mock trials, and networking events with local attorneys."
  },
  {
    name: "Campus Cleanup Crew",
    number_of_ratings: 11,
    average_rating: 4.7,
    club_id: 13,
    club_category: "Service & Volunteer",
    days_meet: ["Tuesday", "Thursday"],
    club_description: "Keep campus and surrounding neighborhoods clean through weekly volunteer cleanup events."
  },
  {
    name: "Tabletop Gaming Society",
    number_of_ratings: 36,
    average_rating: 4.3,
    club_id: 14,
    club_category: "Social",
    days_meet: ["Friday"],
    club_description: "Board games, card games, and TTRPGs every week. From Catan to D&D, there's something for everyone."
  },
  {
    name: "Data Science Club",
    number_of_ratings: 52,
    average_rating: 4.5,
    club_id: 15,
    club_category: "STEM",
    days_meet: ["Monday", "Wednesday", "Friday"],
    club_description: "Work on real-world datasets, compete in Kaggle competitions, and learn machine learning as a team."
  },
];