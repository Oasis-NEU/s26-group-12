import { useState } from "react";
import { searchBarStyles } from "./Presets/SearchBar";

function App() {
  const [clubNameSearchValue, setClubNameSearchValue] =
    useState<string>();

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
            }} // ------ Search Bar
          >
            <input
              type="text"
              value={clubNameSearchValue}
              placeholder={"Type here..."}
              style={searchBarStyles.searchInput}
            />
            <button
              style={{
                position: "absolute",
                top: "31.5%",
                transform: "translateY(-50%)",
                background: "#ffffff01",
                right:"28.8%",
                borderRadius:"50%",
                border:"0px",
                padding:"0.25rem 0.25rem"
              }}
            >
              <img
                src="src/Images/SearchVector.png"
                alt=""
                style={{ maxWidth: "2.7rem" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
