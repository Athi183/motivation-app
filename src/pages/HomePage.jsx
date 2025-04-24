import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // <-- Import motion here!

function HomePage() {
  const quotes = [
    "You are enough. Just begin.",
    "Every step forward counts.",
    "Progress, not perfection.",
    "Your only limit is you.",
    "Small efforts make big changes.",
    "Keep going, you're growing.",
    "Start now. The rest will follow.",
  ];

  const affirmations = [
    "I am calm and centered.",
    "I am worthy of all good things.",
    "I radiate confidence and peace.",
  ];

  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState("motivation");
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);
  const currentList = mode === "motivation" ? quotes : affirmations;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % currentList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentList]);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className="overlay"></div>

      <motion.div className="app" initial={{ opacity: 0, scale: 0.9, y: -50 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.2 }}>
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/nature-loop.mp4" type="video/mp4" />
        </video>

        <audio ref={audioRef} autoPlay loop muted={false}>
          <source src="/background-music.mp3" type="audio/mp3" />
        </audio>

        <header>
          <h1>🌟 My Motivation Hub 🌟</h1>
          <p>Welcome! Let’s find your spark for today ✨</p>
        </header>

        <main>
        <motion.h2 key={index} className="quote" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {currentList[index]}
        </motion.h2>

        <div className="toggle-container">
          <label className="switch">
            <input type="checkbox" checked={mode === "affirmation"} onChange={() => {
              setMode(mode === "motivation" ? "affirmation" : "motivation");
              setIndex(0);
            }} />
            <span className="slider"></span>
          </label>
          <span className="toggle-label">{mode === "affirmation" ? "🌈 Affirmation" : "⚡ Motivation"}</span>
        </div>

        <div className="music-controls">
          <button onClick={toggleMusic}>{isPlaying ? 'Pause Music' : 'Play Music'}</button>
        </div>
        
        <div className="button-row">
          {/* 🎯 Mood Tracker Box */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Link to="/mood" className="mood-box">
              🧠 Mood Tracker → <br />
              Track your daily mood with a tap, <br />
              reflect on how you feel,<br />
              and get personalized motivation <br />based on your vibe! 😊
            </Link>
          </motion.div>

          {/* 💤 Lazy Button */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Link to="/lazy" className="lazy-button">
              😴 I’m Feeling Lazy<br />
              Tap for a fun nudge <br />or <br />tiny challenge to get moving!
            </Link>
          </motion.div>

          {/* 💤 Minute Button */}
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Link to="/mindful" className="mindful-button">
              🌸 Need a Mindful Break?<br />
              Tap for a calming nudge<br />
              and <br/>a peaceful moment 🌿
            </Link>
          </motion.div>
        </div>
      </main>

        <footer>
          <small>Made with love 💖</small>
        </footer>
      </motion.div>
    </>
  );
}

export default HomePage;
