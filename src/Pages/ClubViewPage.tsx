import { useState } from "react";
import type { Club } from "../Classes/Club";
import { defaultClubs } from "../Classes/Club";
import ClubCard from "../Presets/ClubCard";


function ClubViewPage() {
  const [clubsTable, setClubsTable] = useState<Club[]>(defaultClubs);
  const [filteringClubs, setFilteringClubs] = useState<boolean>(false);

  return (
    <div style={{ backgroundColor: "#ffffff", width: "100%", height: "100%" }}>
      <div
        style={{
          // ------- BLACK BAR
          height: "80px",
          backgroundColor: "#000000",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <div
          style={{
            height: "80px",
            backgroundColor: "#ffffff01",
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginLeft: "-5rem",
            gap: "16px",
          }}
        >
          <div
            style={{
              color: "#ffffff",
              backgroundColor: "transparent", // ------- SEARCH CLUBS TEXT
              border: "none",
              fontSize: "1.5rem",
              fontWeight: "450",
              marginRight: "12rem",
              marginTop: "0.5rem",
              fontFamily: "-apple-system",
            }}
          >
            Search Clubs
          </div>

          <input
            type="text"
            placeholder="Club name" // ----- Search Bar
            style={{
              width: "35rem",
              height: "50%",
              backgroundColor: "#ffffff",
              border: "none",
              borderRadius: "40px",
              fontSize: "1rem",
              padding: "0 40px",
              color: "#000000",
              outline: "none",
              marginTop: "0.8rem",
              marginRight: "0rem",
            }}
          />
          <button
            style={{
              color: "#ffffff",
              backgroundColor: "transparent", // ------- FILTER BUTTON
              border: "none",
              fontSize: "18px",
              fontWeight: "500",
              cursor: "pointer",
              marginRight: "5rem",
              marginTop: "0.6rem",
            }}
            onClick={() => setFilteringClubs(!filteringClubs)}
          >
            Filter
          </button>
          <button
            style={{
              color: "#ffffff",
              backgroundColor: "transparent", // ------- LOG IN BUTTON
              border: "none",
              fontSize: "18px",
              fontWeight: "500",
              cursor: "pointer",
              padding: "12px 24px",
            }}
          >
            Log In
          </button>

          {/* Sign Up */}
          <button
            style={{
              color: "#ffffff",
              backgroundColor: "transparent", // ------- SIGN UP BUTTON
              border: "2px solid #ffffff",
              borderRadius: "50px",
              fontSize: "18px",
              fontWeight: "500",
              cursor: "pointer",
              padding: "12px 32px",
            }}
          >
            Sign Up
          </button>

          {/* Help */}
          <button
            style={{
              color: "#000000",
              backgroundColor: "#ffffff", // ------- HELP BUTTON
              border: "none",
              borderRadius: "50px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              padding: "12px 32px",
            }}
          >
            Help
          </button>
        </div>
      </div>
      {filteringClubs === true && (
        <div
          style={{
            color: "#f2f2f2ff",
            width: "90%",
            height: "10rem",
            display: "flex",
            flexWrap: "wrap",
          }}
        >


        </div>
      )}
      <div
        style={{
          marginTop: "80px", // -------- SCROLLABLE CONTENT
          padding: "20px",
          overflowY: "auto",
          height: "calc(100vh - 80px)",
        }}
      >
        {clubsTable.map((clubObject) => (
          <ClubCard key={clubObject.club_id} club={clubObject} />
        ))}
      </div>
    </div>
  );
}

export default ClubViewPage;
