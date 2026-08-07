'use client';

import { useState, createContext, useContext } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ message: '', show: false });

  const showToast = (message, duration = 3000) => {
    setToast({ message, show: true });
    setTimeout(() => {
      setToast({ message: '', show: false });
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div id="toast" className={`toast-notification ${toast.show ? 'show' : ''}`}>
        <span id="toast-message">{toast.message}</span>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
