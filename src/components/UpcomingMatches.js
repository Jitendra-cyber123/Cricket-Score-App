// src/components/UpcomingMatches.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MatchCard.css";


export default function UpcomingMatches() {
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await axios.get(`https://api.cricapi.com/v1/matches?apikey=${process.env.REACT_APP_CRICKET_API_KEY}`);
        const future = res.data.data.filter((match) => match.status === "not started");
        setUpcoming(future);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUpcoming();
  }, []);

  return (
    <div className="match-container">
      <h2>Upcoming Matches</h2>
      {upcoming.map((match, index) => (
        <div key={index} className="match-card">
          <h3>{match.name}</h3>
          <p>{match.date}</p>
          <p>{match.teams?.join(" vs ")}</p>
        </div>
      ))}
    </div>
  );
}
