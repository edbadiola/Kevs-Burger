import React from 'react';

export default function BurgerCounter({ count }) {
  const maxBurgers = 100;
  const percentage = Math.min((count / maxBurgers) * 100, 100);

  return (
    <div className="card" style={{ marginBottom: '16px', padding: '16px', textAlign: 'center' }}>
      <h3 style={{ fontSize: '15px', color: 'var(--text-main)', marginBottom: '12px', fontWeight: 800 }}>
        🍔 Daily Goal: {count} / {maxBurgers} Burgers
      </h3>
      <div style={{ background: '#e2e8f0', height: '28px', borderRadius: '14px', position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ 
          background: 'linear-gradient(90deg, #facc15, #f59e0b)', 
          width: `${percentage}%`, 
          height: '100%', 
          transition: 'width 1s ease-out',
          borderRadius: '14px'
        }}></div>
        <div className="moving-burger" style={{ 
          position: 'absolute', 
          left: `calc(${percentage}% - 24px)`, 
          top: '2px',
          fontSize: '20px',
          transition: 'left 1s ease-out',
          filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))'
        }}>
          🍔
        </div>
      </div>
    </div>
  );
}
