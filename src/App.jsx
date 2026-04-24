import React, { useState, useEffect } from 'react'
import Menu from './components/Menu'
import Cart from './components/Cart'
import OrderTracker from './components/OrderTracker'
import BurgerCounter from './components/BurgerCounter'
import ConfirmModal from './components/ConfirmModal'
import confetti from 'canvas-confetti'
import './App.css'

const playSuccessSound = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // First note
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
    gain1.gain.setValueAtTime(0, audioCtx.currentTime);
    gain1.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(audioCtx.currentTime);
    osc1.stop(audioCtx.currentTime + 0.2);

    // Second higher note (success chime)
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1108.73, audioCtx.currentTime + 0.1); // C#6
    gain2.gain.setValueAtTime(0, audioCtx.currentTime + 0.1);
    gain2.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(audioCtx.currentTime + 0.1);
    osc2.stop(audioCtx.currentTime + 0.6);
  } catch(e) {
    console.error("Audio playback failed", e);
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'tracker'
  const [cart, setCart] = useState([]);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, message: '', onConfirm: null });
  const [trackedOrders, setTrackedOrders] = useState(() => {
    const saved = localStorage.getItem('kevs-burger-orders');
    return saved ? JSON.parse(saved) : [];
  });


  // Save tracked orders to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('kevs-burger-orders', JSON.stringify(trackedOrders));
  }, [trackedOrders]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      return prevCart.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setConfirmModal({
      isOpen: true,
      message: "Are you sure you want to clear your current order?",
      onConfirm: () => {
        setCart([]);
        setConfirmModal({ isOpen: false, message: '', onConfirm: null });
      }
    });
  };

  const checkout = () => {
    if (cart.length === 0) return;

    // Trigger celebratory effects!
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#facc15', '#ef4444', '#38bdf8', '#ffffff'] // Brand colors
    });
    playSuccessSound();

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const now = new Date();
    
    // Formatting date and time
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      id: Math.floor(1000 + Math.random() * 9000).toString(), // Random 4-digit ID
      items: [...cart],
      total,
      time: `${dateStr} ${timeStr}`
    };

    setTrackedOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setActiveTab('tracker');
  };

  const clearOrders = () => {
    setConfirmModal({
      isOpen: true,
      message: "Are you sure you want to clear all tracked orders?",
      onConfirm: () => {
        setTrackedOrders([]);
        setConfirmModal({ isOpen: false, message: '', onConfirm: null });
      }
    });
  };

  const burgersSold = trackedOrders.reduce((total, order) => {
    return total + order.items.reduce((sum, item) => {
      // Sum burgers, hotdogs, sandwiches
      if (item.name.toLowerCase().includes('burger') || item.name.toLowerCase().includes('hotdog') || item.name.toLowerCase().includes('sandwich')) {
        return sum + item.quantity;
      }
      return sum;
    }, 0);
  }, 0);

  return (
    <div className="app-container">
      {cart.length === 0 && (
        <div className="top-sections">
          <header className="header">
            <h1>Kev's Burger</h1>
          </header>
          
          <BurgerCounter count={burgersSold} />
        </div>
      )}

      <div className="tabs">
        <div 
          className={`tab ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          Menu & Order
        </div>
        <div 
          className={`tab ${activeTab === 'tracker' ? 'active' : ''}`}
          onClick={() => setActiveTab('tracker')}
        >
          Tracker ({trackedOrders.length})
        </div>
      </div>

      {activeTab === 'menu' && (
        <div style={{ paddingBottom: '40vh' }}>
          <Menu addToCart={addToCart} />
          <Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} checkout={checkout} />
        </div>
      )}

      {activeTab === 'tracker' && (
        <OrderTracker orders={trackedOrders} clearOrders={clearOrders} />
      )}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        message={confirmModal.message}
        onCancel={() => setConfirmModal({ isOpen: false, message: '', onConfirm: null })}
        onConfirm={confirmModal.onConfirm}
      />
    </div>
  )
}

export default App
