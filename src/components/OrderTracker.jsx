import React from 'react';

export default function OrderTracker({ orders, clearOrders }) {
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
        <button 
          onClick={clearOrders} 
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}
        >
          Clear All
        </button>
      </div>

      <div className="tracked-orders-list">
        {orders.map((order) => (
          <div key={order.id} className="tracked-order">
            <div className="tracked-order-header">
              <span className="tracked-order-id">#{order.id}</span>
              <span className="tracked-order-time">{order.time}</span>
            </div>
            
            <div style={{ paddingLeft: '8px', borderLeft: '2px solid #f1f5f9' }}>
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
