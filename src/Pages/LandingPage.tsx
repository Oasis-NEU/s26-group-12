import { useState } from "react";
import { searchBarStyles } from "../Presets/SearchBar";
import { clubAPI } from "../api/client";

type Props = {
  onSearchClub: (searchString: string) => void;
};

export default function LandingPage({ onSearchClub }: Props) {
  const [clubNameSearchValue, setClubNameSearchValue] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);

  const handleSearch = async () => {
    if (clubNameSearchValue.trim() === "") {
      onSearchClub("");
      return;
    }

    try {
      setSearching(true);
      // Perform search via backend API
      const results = await clubAPI.searchClubs(clubNameSearchValue);
      console.log("Search results:", results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearching(false);
      onSearchClub(clubNameSearchValue);
    }
  };

  return (
    <div style={{ backgroundColor: "#ffffff", width: "100%", height: "100%" }}>
      <div
        style={{ marginTop: "2rem" }} // ------- EMPTY SPACE
      ></div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "#000000",
            fontSize: "1.25rem",
            fontWeight: "600",
            cursor: "pointer",
            padding: "0.75rem 1.5rem",
          }}
        >
          Log In
        </button>
        <button
          style={{
            backgroundColor: "#000000",
            border: "none",
            color: "#ffffff",
            fontSize: "1.25rem",
            fontWeight: "600",
            cursor: "pointer",
            padding: "0.75rem 2rem",
            borderRadius: "9999px", // Makes it fully rounded
          }}
        >
          Sign Up
        </button>
      </div>

      <div style={{ marginTop: "2rem" }}></div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#3a3a3aff",
          backgroundImage: "url(src/Images/Campus.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }} // Frame covering elements
      >
        <div style={{ backgroundColor: "#00000079", padding: "1rem 1rem" }}>
          <div
            style={{
              color: "#f6f6f6ff",
              textAlign: "center",
              fontFamily: "-apple-system",
              fontSize: "2.5rem",
              marginTop: "2rem",
              fontWeight: 400,
            }} // ------ Title Text
          >
            <strong>Northeastern University Club Finder</strong>
          </div>
          <div
            style={{
              color: "#f6f6f6ff",
              textAlign: "center",
              fontFamily: "-apple-system",
              fontSize: "1.5rem",
              marginTop: "2rem",
              fontWeight: 400,
            }} // ------ Title Text
          >
            Enter a <strong>Club</strong> to get Started
          </div>
          <div
            style={{
              ...searchBarStyles.searchContainer,
              margin: "0 auto",
              marginBottom: "1rem",
              position: "relative", 
            }}
          >
            <input
              type="text"
              value={clubNameSearchValue}
              onChange={(e) => setClubNameSearchValue(e.target.value)}
              placeholder={"Type here..."}
              style={searchBarStyles.searchInput}
            />
            <button
              style={{
                position: "absolute",
                top: "50%",
                right: "-2.3rem", 
                transform: "translateY(-50%)",
                background: "transparent",
                borderRadius: "50%",
                border: "none",
                padding: "0.25rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                fontSize:"2.1rem"
              }}
              onClick={handleSearch}
              disabled={searching}
            >
              {searching ? "⏳" : "🔍"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
