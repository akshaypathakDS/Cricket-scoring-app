import React, { useState } from 'react'
import MatchTabs from "./pages/MatchTabs";
import MatchSetup from "./pages/MatchSetup";

export default function App() {
  const [matchData, setMatchData] = useState(null);

  const handleStart = (data) => {
    setMatchData(data); // store live match data
  };

  const handleReset = () => {
    setMatchData(null); // go back to match setup
  };

  return (
    <>
      {!matchData ? (
        <MatchSetup onStart={handleStart} />
      ) : (
        <MatchTabs matchData={matchData} onReset={handleReset} />
      )}
    </>
  );
}