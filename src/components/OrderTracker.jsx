import React, { useState } from 'react';

export default function OrderTracker({ orders, clearOrders }) {
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyAll = () => {
    let receipt = `Kev's Burger - All Tracked Orders\n`;
    receipt += `========================\n\n`;
    
    let grandTotal = 0;

    orders.forEach((order) => {
      receipt += `Order #${order.id} | ${order.time}\n`;
      order.items.forEach(item => {
        receipt += `${item.quantity}x ${item.name} - ₱${(item.price * item.quantity).toFixed(2)}\n`;
      });
      receipt += `Total: ₱${order.total.toFixed(2)}\n`;
      receipt += `------------------------\n\n`;
      grandTotal += order.total;
    });

    receipt += `========================\n`;
    receipt += `GRAND TOTAL: ₱${grandTotal.toFixed(2)}`;

    navigator.clipboard.writeText(receipt).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }).catch(err => {
      console.error('Failed to copy all receipts: ', err);
    });
  };

  if (orders.length === 0) {
    return (
      <div className="card empty-state">
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
        <h3>No tracked orders</h3>
        <p>Completed orders will appear here for tracking.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0 }}>📊 Tracked Orders</h2>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={handleCopyAll}
            style={{ 
              background: copiedAll ? '#10b981' : 'var(--primary-color)', 
              border: 'none', 
              color: copiedAll ? 'white' : '#000', 
              borderRadius: '6px', 
              padding: '6px 12px', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              transition: 'all 0.2s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {copiedAll ? 'Copied All!' : 'Copy All Orders'}
          </button>
          <button 
            onClick={clearOrders} 
            style={{ background: 'transparent', border: 'none', color: 'var(--accent-color)', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="tracked-orders-list">
        {orders.map((order) => (
          <div key={order.id} className="tracked-order">
            <div className="tracked-order-header">
              <div>
                <span className="tracked-order-id">#{order.id}</span>
                <span className="tracked-order-time" style={{ marginLeft: '8px' }}>{order.time}</span>
              </div>
            </div>
            
            <div style={{ paddingLeft: '8px', borderLeft: '2px solid #f1f5f9', marginTop: '8px' }}>
              {order.items.map((item, idx) => (
                <div key={idx} style={{ fontSize: '14px', marginBottom: '4px' }}>
                  <b>{item.quantity}x</b> {item.name}
                </div>
              ))}
            </div>

            <div className="tracked-order-total">
              ₱{order.total.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
