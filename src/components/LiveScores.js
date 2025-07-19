import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/LiveScores.css";

export default function LiveScores() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await axios.get(
          `https://api.cricapi.com/v1/currentMatches?apikey=0ef4b82d-64c0-487b-af8b-5ca134ea530c&offset=0`
        );
        console.log("API response:", res.data);
        setMatches(res.data.data || []);
      } catch (err) {
        console.error("API error:", err);
      }
    };
    fetchLive();
  }, []);

  return (
    <div className="match-container">
      <h2>Live Matches</h2>
      {matches.length === 0 ? (
        <p>No live matches found.</p>
      ) : (
        matches.map((match, index) => (
          <div key={index} className="match-card">
            <h3>{match.name}</h3>
            <p>{match.status}</p>
            <p>{match.teams?.join(" vs ")}</p>
          </div>
        ))
      )}
    </div>
  );
}
