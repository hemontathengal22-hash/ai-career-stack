import React, { useState } from 'react';
import './index.css';

const GAME_SCENARIOS = [
  { text: "Button click karne par pura page gayab ho jata hai.", type: "bug", funnyReply: "Arre bhai! Magic show chal raha hai kya? Yeh pakka BUG hai!" },
  { text: "Code bina kisi error ke chal gaya, par output bilkul khali hai.", type: "feature", funnyReply: "Sannata hi sabse bada sach hai. Yeh ek FEATURE hai!" },
  { text: "Server 500 Internal Error de raha hai jab chai thandi ho jaye.", type: "bug", funnyReply: "Chai ka temperature server se link nahi hota! Bug hai!" },
  { text: "Ek variable ka naam 'asdfg' rakha aur code perfectly run ho gaya.", type: "feature", funnyReply: "Aise genius variable names sirf legends rakhte hain. Pure Feature!" }
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const handleChoice = (choice) => {
    const current = GAME_SCENARIOS[currentIndex];
    if (choice === current.type) {
      setScore(score + 10);
      setMessage(`Sahi pakde hain! 🎉 ${current.funnyReply}`);
    } else {
      setMessage(`Galat jawab! ❌ ${current.funnyReply}`);
    }

    setTimeout(() => {
      setMessage('');
      if (currentIndex + 1 < GAME_SCENARIOS.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setGameOver(true);
      }
    }, 2000);
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setMessage('');
    setGameOver(false);
  };

  return (
    <div className="app-container" style={{ textAlign: 'center', padding: '40px' }}>
      <h1>🎮 Bug or Feature? (Student Edition)</h1>
      <p>Decide karo ki code ka yeh harkat bug hai ya naya feature!</p>

      {!gameOver ? (
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', margin: '20px auto', maxWidth: '500px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h3>Score: {score}</h3>
          <p style={{ fontSize: '1.2rem', margin: '20px 0' }}><b>Scenario:</b> "{GAME_SCENARIOS[currentIndex].text}"</p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <button onClick={() => handleChoice('bug')} className="primary-btn" style={{ background: '#ef4444' }}>🛑 Bug hai</button>
            <button onClick={() => handleChoice('feature')} className="primary-btn" style={{ background: '#10b981' }}>✨ Feature hai</button>
          </div>

          {message && <p style={{ marginTop: '20px', fontWeight: 'bold', color: '#4f46e5' }}>{message}</p>}
        </div>
      ) : (
        <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', margin: '20px auto', maxWidth: '500px' }}>
          <h2>🏆 Game Complete!</h2>
          <p style={{ fontSize: '1.2rem', margin: '15px 0' }}>Aapka Final Score: <b>{score} / 40</b></p>
          <p>Aap ek asli developer banne ki raah par hain!</p>
          <button onClick={restartGame} className="primary-btn" style={{ marginTop: '15px' }}>Dobara Khelein 🔄</button>
        </div>
      )}
    </div>
  );
}
