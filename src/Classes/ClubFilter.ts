export type ClubFilter = {
  "Average Rating"?: "4.5 - 5.0" | "3.0 - 5.0" | "1.5 - 5.0" | null;
  "Club Category"?:
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
    | null;
  "Meeting Days"?: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | null;
  "# of Ratings"?: "5+" | "15+" | "50+" | null;
};

export const emptyClubFilter: ClubFilter = {
  "Average Rating": null,
  "Club Category": null,
  "Meeting Days": null,
  "# of Ratings": null
}