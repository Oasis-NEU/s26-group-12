import { useState } from "react";
import type { Club, meetDay } from "../Classes/Club";
import type { ClubFilter } from "../Classes/ClubFilter";
import { defaultClubs } from "../Classes/Club";
import ClubCard from "../Presets/ClubCard";
import ClubSearchFilters from "../Presets/ClubFilter";

function ClubViewPage() {
  const [clubsTable, setClubsTable] = useState<Club[]>(defaultClubs);
  const [clubsShown, setClubsShown] = useState<Club[]>(defaultClubs);
  const [filteringClubs, setFilteringClubs] = useState<boolean>(false);

  const handleClubFilterChange = (filters: ClubFilter) => {
    let end_club_list: Club[] = [...clubsTable];
    if (filters?.["Average Rating"]) {
      const [min] = filters["Average Rating"].split(" - ").map(Number);
      end_club_list = end_club_list.filter(
        (club) => club.average_rating >= min,
      );
    }

    if (filters?.["Club Category"]) {
      end_club_list = end_club_list.filter(
        (club) => club.club_category === filters["Club Category"],
      );
    }

    if (filters?.["Meeting Days"]) {
      end_club_list = end_club_list.filter((club) =>
        club.days_meet.includes(filters["Meeting Days"] as meetDay),
      );
    }

    if (filters?.["# of Ratings"]) {
      const [min] = filters["# of Ratings"].split("+").map(Number);
      end_club_list = end_club_list.filter(
        (club) => club.number_of_ratings >= min,
      );
    }
    setClubsShown(end_club_list);
  };

  return (
    <div style={{ backgroundColor: "#ffffff", width: "100%", height: "100%" }}>
      <div
        style={{
          height: "70px",
          backgroundColor: "#000000",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
          padding: "0 24px",
          gap: "12px",
          zIndex: 999,
        }}
      >
        {/* Left: Title */}
        <div
          style={{
            color: "#ffffff",
            fontSize: "1.3rem",
            fontWeight: "450",
            fontFamily: "-apple-system",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          Search Clubs
        </div>

        {/* Center: Search bar */}
        <div
          style={{
            position: "relative",
            flex: 1,
            maxWidth: "500px",
            minWidth: "120px",
          }}
        >
          <input
            type="text"
            placeholder="Club name"
            style={{
              width: "100%",
              height: "38px",
              backgroundColor: "#ffffff",
              border: "none",
              borderRadius: "40px",
              fontSize: "1rem",
              padding: "0 40px 0 16px",
              color: "#000000",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <button
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              fontSize:"1.7rem",
              alignItems: "center",
            }}
          >
            🔍
          </button>
        </div>

        {/* Right: Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setFilteringClubs(!filteringClubs)}
            style={{
              color: "#ffffff",
              backgroundColor: "transparent",
              border: "none",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              whiteSpace: "nowrap",
              padding: "8px 12px",
            }}
          >
            Filter
          </button>
          <button
            style={{
              color: "#ffffff",
              backgroundColor: "transparent",
              border: "none",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              padding: "8px 12px",
              whiteSpace: "nowrap",
            }}
          >
            Log In
          </button>
          <button
            style={{
              color: "#ffffff",
              backgroundColor: "transparent",
              border: "2px solid #ffffff",
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              padding: "8px 20px",
              whiteSpace: "nowrap",
            }}
          >
            Sign Up
          </button>
          <button
            style={{
              color: "#000000",
              backgroundColor: "#ffffff",
              border: "none",
              borderRadius: "50px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              padding: "8px 20px",
              whiteSpace: "nowrap",
            }}
          >
            Help
          </button>
        </div>
      </div>
      {filteringClubs === true && (
        <ClubSearchFilters
          onClose={() => setFilteringClubs(false)}
          onFilterChange={handleClubFilterChange}
        />
      )}
      <div
        style={{
          marginTop: "80px", // -------- SCROLLABLE CONTENT
          padding: "20px",
          overflowY: "auto",
          height: "calc(100vh - 80px)",
        }}
      >
        {clubsShown.map((clubObject) => (
          <ClubCard key={clubObject.club_id} club={clubObject} />
        ))}
      </div>
    </div>
  );
}

export default ClubViewPage;
