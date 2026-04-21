import React from 'react';

export default function Cart({ cart, removeFromCart, clearCart, checkout }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) return null;

  return (
    <div className="cart-bar expanded">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed rgba(255,255,255,0.3)', paddingBottom: '8px', marginBottom: '8px' }}>
        <h2 style={{ fontSize: '15px', margin: 0, fontWeight: 800, color: 'white' }}>CURRENT ORDER</h2>
        <button onClick={clearCart} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', textDecoration: 'underline', fontSize: '13px', cursor: 'pointer', fontWeight: 'bold' }}>Clear All</button>
      </div>

      <div className="receipt-list" style={{ color: 'white' }}>
        {cart.map((item) => (
          <div key={item.id} className="receipt-item">
            <div className="receipt-item-left">
              <span className="receipt-qty" style={{ color: 'var(--primary-color)' }}>{item.quantity}x</span>
              <span className="receipt-name">{item.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="receipt-price">₱{(item.price * item.quantity).toFixed(2)}</span>
              <button className="receipt-remove dark-remove" onClick={() => removeFromCart(item.id)}>×</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed rgba(255,255,255,0.3)' }}>
        <div className="cart-info" style={{ fontFamily: 'var(--font-main)' }}>
          <div className="cart-items" style={{ color: 'rgba(255,255,255,0.7)' }}>{totalItems} {totalItems === 1 ? 'Item' : 'Items'}</div>
          <div className="cart-total" style={{ color: 'var(--primary-color)', fontSize: '22px' }}>₱{total.toFixed(2)}</div>
        </div>
        <button className="btn" onClick={checkout} style={{ fontFamily: 'var(--font-main)' }}>
          Checkout
        </button>
      </div>
    </div>
  );
}
