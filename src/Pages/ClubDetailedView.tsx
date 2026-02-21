import { useState } from "react";
import { searchBarStyles } from "../Presets/SearchBar";
import { clubAPI } from "../api/client";
import type { Club } from "../Classes/Club";
import TopBar from "../Presets/TopBar";

type Props = {
  onNavigateLogin: () => void;
  onNavigateSignup: () => void;
  activeSearchString: string;
  onSetActiveSearchString: (searchString: string) => void;
  onNavigateHome: () => void;
  clubBeingViewed: Club | null;
  onSearchClub: (value: string) => void;
};

function countTimesShown(list: any[], value: any): number {
  return list.filter((item) => item === value).length;
}

export default function ClubDetailedView({
  onNavigateLogin,
  onNavigateSignup,
  onSetActiveSearchString,
  activeSearchString,
  onNavigateHome,
  clubBeingViewed,
  onSearchClub
}: Props) {
  if (clubBeingViewed === null) {
    return;
  }

  const handleSearchButtonClicked = () => {
    onSetActiveSearchString(activeSearchString);
    onSearchClub(activeSearchString);
  }

  const totalRatings = clubBeingViewed.number_of_ratings;
  const averageRating = clubBeingViewed.average_rating;
  const clubName = clubBeingViewed.name; // replace with your variable

  const ratingLabels = ["Awesome", "Great", "Good", "OK", "Terrible"];
  const ratingValues = [5, 4, 3, 2, 1];
  const ratingCounts = [
    countTimesShown(clubBeingViewed.individual_ratings, 5),
    countTimesShown(clubBeingViewed.individual_ratings, 4),
    countTimesShown(clubBeingViewed.individual_ratings, 3),
    countTimesShown(clubBeingViewed.individual_ratings, 2),
    countTimesShown(clubBeingViewed.individual_ratings, 1),
  ];
  const maxCount = Math.max(...ratingCounts);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        height: "100%",
        fontFamily: "-apple-system",
      }}
    >
      <TopBar
        onSearchButtonClicked={handleSearchButtonClicked}
        onSetActiveSearchString={onSetActiveSearchString}
        activeSearchString={activeSearchString}
        onNavigateHome={onNavigateHome}
        onNavigateLogin={onNavigateLogin}
        onNavigateSignup={onNavigateSignup}
        showFilterButton={false}
        leftCornerText={""}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "100px 2rem 2rem 15.6rem",
          gap: "2.6rem",
          backgroundColor: "#ffffffff",
        }}
      >
        {/* Left side */}
        <div style={{ minWidth: "286px", flex: "0 0 auto" }}>
          <div
            style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}
          >
            <span
              style={{ fontSize: "6.5rem", fontWeight: 900, lineHeight: 1 }}
            >
              {averageRating.toFixed(1)}
            </span>
            <span style={{ fontSize: "1.56rem", color: "#888" }}>/ 5</span>
          </div>
          <p
            style={{
              fontWeight: 700,
              marginBottom: "1.95rem",
              fontSize: "1.235rem",
            }}
          >
            Overall Quality Based on{" "}
            <span style={{ textDecoration: "underline" }}>
              {totalRatings} ratings
            </span>
          </p>
          <h2 style={{ fontSize: "2.6rem", fontWeight: 900, margin: 0 }}>
            {clubName}
          </h2>
        </div>

        {/* Right side - Rating Distribution */}
        <div
          style={{
            flex: "1 1 390px",
            backgroundColor: "#f5f5f5ff",
            borderRadius: "10px",
            padding: "1.95rem",
            paddingLeft:"3rem",
            paddingRight:"3rem",
            maxWidth: "676px",
          }}
        >
          <p
            style={{
              fontWeight: 700,
              marginBottom: "1.3rem",
              fontSize: "1.3rem",
            }}
          >
            Rating Distribution
          </p>

          {ratingLabels.map((label, i) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.975rem",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  width: "7.15rem",
                  textAlign: "right",
                  fontSize: "1.235rem",
                  flexShrink: 0,
                }}
              >
                {label} <strong>{ratingValues[i]}</strong>
              </span>
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#e0e0e0",
                  borderRadius: "4px",
                  height: "2.5rem",
                }}
              >
                <div
                  style={{
                    width:
                      maxCount > 0
                        ? `${(ratingCounts[i] / maxCount) * 100}%`
                        : "0%",
                    backgroundColor: "#1a73e8",
                    height: "100%",
                    borderRadius: "4px",
                  }}
                />
              </div>
              <span
                style={{
                  width: "2.5rem",
                  fontWeight: 900,
                  fontSize: "1.5rem",
                  flexShrink: 0,
                }}
              >
                {ratingCounts[i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
