const fs = require('fs');
const lines = fs.readFileSync('src/index.css', 'utf8').split('\n');
const goodLines = lines.slice(0, 478);
const modalCss = `
/* Modal */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: var(--card-bg);
  border: 1px solid rgba(255,255,255,0.6);
  width: 90%;
  max-width: 320px;
  border-radius: var(--radius-lg);
  padding: 24px;
  text-align: center;
  box-shadow: var(--shadow-lg);
  animation: scaleUp 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes scaleUp {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-content p {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 24px;
  line-height: 1.4;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.modal-actions .btn {
  flex: 1;
  padding: 10px 16px;
}

.modal-actions .btn-cancel {
  background: #e2e8f0;
  color: var(--text-main);
  box-shadow: none;
}
.modal-actions .btn-cancel:active {
  background: #cbd5e1;
}
`;
fs.writeFileSync('src/index.css', goodLines.join('\n') + modalCss);
console.log("CSS fixed successfully.");
