import { useState } from "react";
import type { Club } from "./Classes/Club";
import LandingPage from './Pages/LandingPage.tsx'
import ClubViewPage from './Pages/ClubViewPage.tsx'

export default function App() {
  const [page, setPage] = useState<"landing" | "clubview">("landing");

  // shared state goes here
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [searchString, setSearchString] = useState<string>("");

  const handleSearchLandingPage = (searchString: string) => {
    setPage("clubview")
    setSearchString(searchString)
    console.log(searchString)
  }

  if (page === "landing") return (
    <LandingPage
      onSearchClub={(searchString) => handleSearchLandingPage(searchString)}
    />
  );

  if (page === "clubview") return (
    <ClubViewPage
      onSelectClub={(club) => setSelectedClub(club)}
      onSetActiveSearchString={(searchString) => setSearchString(searchString)}
      activeSearchString={searchString}
    />
  );
}