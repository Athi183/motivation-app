import React, { useState, useRef, useEffect } from 'react';
import './MoodTracker.css';

const moods = [
  { emoji: '😊', message: "Feeling good! Keep spreading those vibes!" },
  { emoji: '😔', message: "It's okay to have down days. Breathe, you're not alone." },
  { emoji: '😠', message: "Take a pause. Let go of what you can't control." },
  { emoji: '😴', message: "Maybe a little rest is all you need today." },
  { emoji: '🤩', message: "You're unstoppable today! Chase those dreams!" }
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(() => {
    return localStorage.getItem('mood') || null;
  });

  const audioRef = useRef(null);

  useEffect(() => {
    if (selectedMood && audioRef.current) {
      audioRef.current.play().catch(e => {
        // silently handle autoplay issues in some browsers
        console.log('Audio play prevented:', e);
      });
    }
  }, [selectedMood]);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood.emoji);
    localStorage.setItem('mood', mood.emoji);
  };

  const getMoodMessage = () => {
    const moodObj = moods.find((m) => m.emoji === selectedMood);
    return moodObj ? moodObj.message : null;
  };

  return (
    <div className="mood-container fade-in">
      <h2>🧠 How are you feeling today?</h2>
      <div className="mood-options">
        {moods.map((mood) => (
          <button
            key={mood.emoji}
            className={`mood-btn ${selectedMood === mood.emoji ? 'selected' : ''}`}
            onClick={() => handleMoodClick(mood)}
          >
            {mood.emoji}
          </button>
        ))}
      </div>

      {selectedMood && (
        <p className="mood-message">{getMoodMessage()}</p>
      )}

      {/* Background music */}
      <audio ref={audioRef} src="/background-music.mp3" loop />
    </div>
  );
};

export default MoodTracker;
