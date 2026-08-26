import React, { useState, useEffect } from 'react';
import './SitePreloader.css';

export default function SitePreloader({ onFinish }) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 700);

    const removeTimer = setTimeout(() => {
      setIsDone(true);
      if (onFinish) onFinish();
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  if (isDone) return null;

  return (
    <div className={`preloader-overlay ${isFadingOut ? 'fade-out' : ''}`}>
      {/* From Uiverse.io by Smit-Prajapati (Minimalist Pure Ripple Circles) */}
      <div className="loader">
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
    </div>
  );
}
