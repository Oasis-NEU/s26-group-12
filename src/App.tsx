import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import type { Club } from "./Classes/Club";
import LandingPage from "./Pages/LandingPage.tsx";
import ClubViewPage from "./Pages/ClubViewPage.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import SignupPage from "./Pages/SignupPage.tsx";

export default function App() {
  const navigate = useNavigate();
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [searchString, setSearchString] = useState<string>("");

  const handleSearchLandingPage = (searchString: string) => {
    setSearchString(searchString);
    navigate("/clubs");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            onSearchClub={(searchValue) => handleSearchLandingPage(searchValue)}
            onNavigateLogin={() => navigate("/login")}
            onNavigateSignup={() => navigate("/signup")}
          />
        }
      />
      <Route
        path="/clubs"
        element={
          <ClubViewPage
            onSelectClub={(club) => setSelectedClub(club)}
            onSetActiveSearchString={(value) => setSearchString(value)}
            activeSearchString={searchString}
            onNavigateHome={() => navigate("/")}
            onNavigateLogin={() => navigate("/login")}
            onNavigateSignup={() => navigate("/signup")}
          />
        }
      />
      <Route
        path="/login"
        element={
          <LoginPage
            onNavigateHome={() => navigate("/")}
            onNavigateSignup={() => navigate("/signup")}
            onLoginSuccess={() => navigate("/clubs")}
          />
        }
      />
      <Route
        path="/signup"
        element={
          <SignupPage
            onNavigateHome={() => navigate("/")}
            onNavigateLogin={() => navigate("/login")}
          />
        }
      />
    </Routes>
  );
}