import React, { useState, useEffect, useRef } from 'react';
import './MindfulMinute.css';

const MindfulMinute = () => {
  const [duration, setDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [quote] = useState("“Almost everything will work again if you unplug it for a few minutes, including you.” – Anne Lamott");

  const audioRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setTimeLeft(duration);
    setIsRunning(true);
    audioRef.current.play();
  };

  const handleDurationChange = (e) => {
    const selectedMinutes = parseInt(e.target.value);
    const seconds = selectedMinutes * 60;
    setDuration(seconds);
    setTimeLeft(seconds);
  };

  return (
    <div className="mindful-box">
      <div className="mindful-container">
        <div className="breathing-circle"></div>
        <div className="content">
          <h2>🌿 Mindful Minute</h2>
          <p className="quote">{quote}</p>

          {!isRunning && (
            <div className="dropdown-container">
              <label htmlFor="duration">Choose your time:</label>
              <select id="duration" onChange={handleDurationChange}>
                <option value="1">1 Minute</option>
                <option value="2">2 Minutes</option>
                <option value="3">3 Minutes</option>
                <option value="5">5 Minutes</option>
              </select>
            </div>
          )}

          <div className="timer">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>

          {!isRunning && (
            <button className="start-btn" onClick={handleStart}>
              Start My Mindful Minute
            </button>
          )}

          {isRunning && (
            <p className="relax-msg">Just breathe and relax... 🌸</p>
          )}
        </div>
        <audio ref={audioRef} src="/calm-music.mp3" loop />
      </div>
    </div>
  );
};

export default MindfulMinute;
