import React, { useState } from 'react';

const MENU_CATEGORIES = [
  {
    name: "Buy 1 Take 1",
    items: [
      { id: 'b1t1_cb', name: "Cheese Burger w/ Drinks", price: 60, icon: "🍔🥤" },
      { id: 'b1t1_rb', name: "Regular Burger w/ Drinks", price: 55, icon: "🍔🥤" },
      { id: 'b1t1_hd', name: "Hotdog Sandwich w/ Drinks", price: 55, icon: "🌭🥤" },
      { id: 'b1t1_hs', name: "Ham Sandwich w/ Drinks", price: 60, icon: "🥪🥤" }
    ]
  },
  {
    name: "Combo Meals",
    items: [
      { id: 'combo_1', name: "Combo #1: Cheese Burger", price: 75, icon: "🍔🍟🥤" },
      { id: 'combo_2', name: "Combo #2: Chicken Burger", price: 73, icon: "🍗🍟🥤" },
      { id: 'combo_3', name: "Combo #3: Cheesy Hotdog", price: 60, icon: "🌭🍟🥤" }
    ]
  },
  {
    name: "A La Carte & Sides",
    items: [
      { id: 'alc_hs', name: "Ham Sandwich", price: 30, icon: "🥪" },
      { id: 'alc_es', name: "Egg Sandwich", price: 30, icon: "🥚🥪" },
      { id: 'alc_hd', name: "Hotdog Sandwich", price: 28, icon: "🌭" },
      { id: 'alc_chd', name: "Chili Hotdog", price: 35, icon: "🌶️🌭" },
      { id: 'alc_chzd', name: "Cheesy Hotdog", price: 37, icon: "🧀🌭" },
      { id: 'alc_fr', name: "Fries", price: 35, icon: "🍟" },
      { id: 'alc_sio', name: "Siomai", price: 35, icon: "🥟" }
    ]
  },
  {
    name: "Add-ons",
    items: [
      { id: 'add_egg', name: "Egg", price: 15, icon: "🍳" },
      { id: 'add_ham', name: "Ham", price: 10, icon: "🥓" },
      { id: 'add_pat', name: "Pattie", price: 10, icon: "🥩" },
      { id: 'add_chz', name: "Cheese", price: 6, icon: "🧀" },
      { id: 'add_drs', name: "Dressing", price: 5, icon: "🥣" }
    ]
  }
];

export default function Menu({ addToCart }) {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].name);
  const [justAdded, setJustAdded] = useState(null);

  const handleAdd = (item) => {
    addToCart(item);
    setJustAdded(item.id);
    setTimeout(() => setJustAdded(null), 300);
  };

  const categories = MENU_CATEGORIES.map(c => c.name);

  return (
    <div style={{ paddingBottom: '20px' }}>
      <div className="category-scroll">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {MENU_CATEGORIES.map((category) => {
        if (activeCategory !== category.name) return null;
        
        return (
          <div key={category.name} className="card" style={{ marginBottom: '16px' }}>
            <h3 style={{ marginBottom: '12px', fontSize: '18px', color: 'var(--text-main)' }}>{category.name}</h3>
            <div className="menu-grid">
              {category.items.map((item) => (
                <div 
                  key={item.id} 
                  className={`menu-item ${justAdded === item.id ? 'added' : ''}`}
                  onClick={() => handleAdd(item)}
                >
                  <div className="icon" style={{ fontSize: '32px' }}>{item.icon}</div>
                  <div className="name">{item.name}</div>
                  <div className="price">₱{item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
