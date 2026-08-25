import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, MessageCircle, Heart, Coffee, Code2, Zap } from 'lucide-react';

const funnyQuotes = [
  '⚡ "It works on my machine! (dan di server Anda juga, dijamin! 😉)"',
  '☕ "Bahan bakar utama kode saya: Kopi robusta + Playlist Lofi."',
  '🚀 "Mau bikin startup sekelas unicorn atau MVP kilat? Gas kita bicarakan!"',
  '🐛 "99 little bugs in the code, fix one bug, 127 little bugs in the code... tapi tenang, saya rapihin!"',
  '💎 "Desain anti-slop, animasi 60 FPS, performa secepat kilat."',
  '✨ "Klik saya lagi untuk tips rahasia coding! 🎉"',
];

export default function InteractiveMascot() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [mood, setMood] = useState('happy');

  const handleMascotClick = () => {
    setQuoteIndex((prev) => (prev + 1) % funnyQuotes.length);
    setClickCount((prev) => prev + 1);

    if (clickCount > 0 && clickCount % 5 === 0) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  return (
    <div className="mascot-wrapper">
      {/* Speech Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={quoteIndex}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="mascot-speech-bubble"
        >
          <div className="bubble-text">{funnyQuotes[quoteIndex]}</div>
          <div className="bubble-arrow"></div>
        </motion.div>
      </AnimatePresence>

      {/* Mascot Avatar Figure */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: [0, -4, 4, 0] }}
        whileTap={{ scale: 0.92 }}
        onClick={handleMascotClick}
        className="mascot-avatar-box"
      >
        <div className="mascot-aura"></div>
        <div className="mascot-inner">
          <div className="mascot-face">
            <span className="mascot-emoji">👨‍💻</span>
          </div>
          <div className="mascot-badge-tag">
            <Coffee size={12} />
            <span>Klik Saya!</span>
          </div>
        </div>
      </motion.div>

      <div className="mascot-counter-tip">
        {clickCount > 0 && (
          <span className="easter-tag">
            ❤️ {clickCount}x Di-pencet! {clickCount >= 5 && '🌟 Kamu nemu Easter Egg!'}
          </span>
        )}
      </div>
    </div>
  );
}
