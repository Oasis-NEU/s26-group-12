import { useState } from "react";

interface TopBarProps {
  onSetActiveSearchString: (searchString: string) => void;
  activeSearchString: string;
  onNavigateHome: () => void;
  setFilteringClubs?: (bool: boolean) => void;
  filteringClubs?: boolean;
  onNavigateLogin: () => void;
  onNavigateSignup: () => void;
  showFilterButton: boolean;
  leftCornerText: string;
  onSearchButtonClicked?: () => void;
}

export default function TopBar({
  onSetActiveSearchString,
  activeSearchString,
  onNavigateHome,
  setFilteringClubs,
  filteringClubs,
  onNavigateLogin,
  onNavigateSignup,
  showFilterButton,
  leftCornerText,
  onSearchButtonClicked,
}: TopBarProps) {
  return (
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
        {leftCornerText}
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
          value={activeSearchString}
          onChange={(e) => onSetActiveSearchString(e.target.value)}
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
            fontSize: "1.7rem",
            alignItems: "center",
          }}
          onClick={() => {
            onSearchButtonClicked ? onSearchButtonClicked() : null;
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
          onClick={onNavigateHome}
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
          Home
        </button>
        {showFilterButton && (
          <button
            onClick={() =>
              setFilteringClubs ? setFilteringClubs(!filteringClubs) : null
            }
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
        )}
        <button
          onClick={onNavigateLogin}
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
          onClick={onNavigateSignup}
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
  );
}
