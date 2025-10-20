import React, { useState } from "react";
import Scoreboard from "../components/Scoreboard";
// import BattingScorecard from "./BattingScorecard"; // optional placeholder
// import MatchSummary from "./MatchSummary"; // optional placeholder

export default function MatchTabs({ matchData, onReset }) {
  const [activeTab, setActiveTab] = useState("Live Score"); // default tab

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-4">
        <button
          onClick={() => setActiveTab("Live Score")}
          className={`px-4 py-2 -mb-px font-semibold border-b-2 ${
            activeTab === "Live Score"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-600"
          }`}
        >
          Live Score
        </button>

        <button
          onClick={() => setActiveTab("batting")}
          className={`px-4 py-2 -mb-px font-semibold border-b-2 ${
            activeTab === "batting"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-600"
          }`}
        >
          Batting
        </button>

        <button
          onClick={() => setActiveTab("summary")}
          className={`px-4 py-2 -mb-px font-semibold border-b-2 ${
            activeTab === "summary"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-600"
          }`}
        >
          Summary
        </button>
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "Live Score" && <Scoreboard matchData={matchData} onReset={onReset} />}
        {activeTab === "batting" && <Scoreboard matchData={matchData} onReset={onReset} />} 
        {/* //<BattingScorecard />} */}
        {activeTab === "summary" && <Scoreboard matchData={matchData} onReset={onReset} />}
         {/* //<MatchSummary matchData={matchData} />} */}
      </div>
    </div>
  );
}
