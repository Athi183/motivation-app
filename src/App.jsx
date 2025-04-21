import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { motion } from 'framer-motion';

function App() {
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

  // ✅ Decide the current list based on mode
  const currentList = mode === "motivation" ? quotes : affirmations;

  // ✅ Change quote/affirmation every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % currentList.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentList]);

  // Manage audio play/pause state
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  // Toggle play/pause of the audio
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

      <motion.div 
        className="app"
        initial={{ opacity: 0, scale: 0.9, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/nature-loop.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Add the background music here */}
        <audio ref={audioRef} autoPlay loop muted={false}>
          <source src="/background-music.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>

        <header>
          <h1>🌟 My Motivation Hub 🌟</h1>
          <p>Welcome! Let’s find your spark for today ✨</p>
        </header>

        <main>
          {/* Display only one dynamic quote */}
          <motion.h2 
            key={index}
            className="quote"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {currentList[index]}
          </motion.h2>

          {/* Navigation buttons */}
          <div className="toggle-container">
            <label className="switch">
              <input 
                type="checkbox" 
                checked={mode === "affirmation"} 
                onChange={() => {
                  setMode(mode === "motivation" ? "affirmation" : "motivation");
                  setIndex(0);
                }} 
              />
              <span className="slider"></span>
            </label>
            <span className="toggle-label">{mode === "affirmation" ? "🌈 Affirmation" : "⚡ Motivation"}</span>
          </div>

          {/* Play/Pause Button */}
          <div className="music-controls">
            <button onClick={toggleMusic}>
              {isPlaying ? 'Pause Music' : 'Play Music'}
            </button>
          </div>
        </main>

        <footer>
          <small>Made with love 💖</small>
        </footer>
      </motion.div>
    </>
  );
}

export default App;
