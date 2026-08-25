import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Bug, Coffee, Sparkles, RefreshCw, Zap, Gift } from 'lucide-react';

export default function MiniGame() {
  const [score, setScore] = useState(0);
  const [bugs, setBugs] = useState([
    { id: 1, x: 20, y: 30, type: 'bug' },
    { id: 2, x: 70, y: 60, type: 'bug' },
    { id: 3, x: 45, y: 20, type: 'coffee' },
  ]);
  const [unlockedReward, setUnlockedReward] = useState(false);

  const handleCatch = (id, type) => {
    setScore((prev) => {
      const newScore = prev + (type === 'coffee' ? 20 : 10);
      if (newScore >= 50 && !unlockedReward) {
        setUnlockedReward(true);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
      return newScore;
    });

    // Respawn at new random position
    setBugs((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              x: Math.floor(Math.random() * 75) + 10,
              y: Math.floor(Math.random() * 65) + 15,
              type: Math.random() > 0.4 ? 'bug' : 'coffee',
            }
          : b
      )
    );
  };

  const resetGame = () => {
    setScore(0);
    setUnlockedReward(false);
  };

  return (
    <section className="mini-game-section">
      <div className="game-card glass-card">
        <div className="game-header">
          <div className="game-badge">
            <Zap size={14} /> Mini Game Penghilang Bosan
          </div>
          <h3>Tangkap Bug & Kumpulkan Kopi 🐛☕</h3>
          <p>
            Klik bug yang berkeliaran di area ini untuk membersihkan kode. Kumpulkan skor <b>50 Poin</b> untuk membuka kode rahasia!
          </p>
          <div className="score-display">
            <Trophy size={18} className="text-accent" />
            <span>Skor Anda: <b>{score}</b></span>
            {score > 0 && (
              <button onClick={resetGame} className="btn-reset-game" title="Reset Skor">
                <RefreshCw size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Game Interactive Canvas Arena */}
        <div className="game-arena">
          <div className="arena-grid-pattern"></div>
          {bugs.map((item) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0 }}
              animate={{
                scale: [1, 1.15, 1],
                x: [`${item.x}%`, `${(item.x + 8) % 85}%`, `${item.x}%`],
                y: [`${item.y}%`, `${(item.y + 12) % 75}%`, `${item.y}%`],
              }}
              transition={{
                duration: 3 + item.id,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => handleCatch(item.id, item.type)}
              className={`game-target ${item.type === 'coffee' ? 'target-coffee' : 'target-bug'}`}
              style={{
                position: 'absolute',
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
            >
              {item.type === 'coffee' ? (
                <div className="target-inner coffee-glow">
                  ☕ <span className="pts-tag">+20</span>
                </div>
              ) : (
                <div className="target-inner bug-glow">
                  🐛 <span className="pts-tag">+10</span>
                </div>
              )}
            </motion.div>
          ))}

          {/* Reward Modal/Banner inside Game Arena */}
          <AnimatePresence>
            {unlockedReward && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="game-reward-overlay"
              >
                <div className="reward-content">
                  <Gift size={32} className="text-accent" />
                  <h4>Selamat! Kamu Berhasil Fix Bug! 🎉</h4>
                  <p>Gunakan kode voucher rahasia ini saat konsultasi proyek:</p>
                  <div className="promo-code-pill">
                    <code>KOPIERZA10</code>
                    <span>(Diskon 10% Jasa Dev)</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
