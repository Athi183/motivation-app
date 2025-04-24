import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './LazyNudge.css';

const challenges = [
  "🧍‍♀️ Do 5 jumping jacks!",
  "🚶‍♂️ Walk for 2 minutes.",
  "🧘 Take 5 deep breaths.",
  "🧼 Clean a tiny corner of your desk.",
  "🪩 Dance for 20 seconds!",
  "👀 Look away from screen for 30 sec."
];

function LazyNudge({ onClose }) {
  const [countdown, setCountdown] = useState(0);
  const [timeUnit, setTimeUnit] = useState('');
  const [challenge, setChallenge] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [bgColor, setBgColor] = useState("#fff");

  const audioRef = useRef(null); // Reference for audio element

  useEffect(() => {
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setChallenge(randomChallenge);
  }, []);

  useEffect(() => {
    if (challenge.includes("minute") || challenge.includes("second")) {
      let time = parseInt(challenge.match(/\d+/)[0]);
      let unit = challenge.includes("minute") ? 'minute' : 'second';
      setCountdown(time);
      setTimeUnit(unit);

      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev === 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [challenge]);

  const handleGotItClick = () => {
    // Play success sound
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play error:", err));
    }

    setShowMessage(true);
    setBgColor("#e0ffe0");

    setTimeout(() => {
      setShowMessage(false);
      setBgColor("#fff");
      onClose();
    }, 6000);
  };

  return (
    <motion.div 
      className="lazy-nudge-box" 
      style={{ backgroundColor: bgColor }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <h3>😴 Feeling lazy?</h3>
      <p>{challenge}</p>

      {countdown > 0 && (
        <p className="timer">
          Time remaining: {countdown} {timeUnit === 'minute' ? 'minute(s)' : 'second(s)'}
        </p>
      )}

      {showMessage && <p className="success">Great job! You've completed the task!</p>}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGotItClick}
      >
        Got it!
      </motion.button>

      {/* 🎵 Success Sound */}
      <audio ref={audioRef} src="/task-complete.mp3" />
    </motion.div>
  );
}

export default LazyNudge;
