import type { ReactNode } from "react";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div className="td-overlay" onClick={onClose}>
      <div className="td-modal p-4" onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">{title}</h5>
          <button className="td-btn-icon" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}