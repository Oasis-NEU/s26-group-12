export type ClubCategory = 
  | "Academic"
  | "Arts & Music"
  | "Cultural"
  | "Service & Volunteer"
  | "Sports & Recreation"
  | "Professional"
  | "Religious & Spiritual"
  | "Media & Publications"
  | "Greek Life"
  | "Special Interest"
  | "Political & Advocacy"
  | "STEM"
  | "Gaming & Esports"
  | "Entrepreneurship"
  | "Health & Wellness"
  | "Environmental"
  | "Performing Arts"
  | "Social"
  | "Leadership"
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
        days_meet: ["Monday", "Tuesday", "Wednesday"],
        club_description: "Build and program robots to compete in regional and national competitions. No experience required!"
    },
    {
        name: "Debate Team",
        number_of_ratings: 32,
        average_rating: 4.3,
        club_id: 2,
        club_category: "Academic",
        days_meet: ["Thursday", "Friday"],
        club_description: "Sharpen your critical thinking and public speaking skills through competitive debate tournaments."
    }
];