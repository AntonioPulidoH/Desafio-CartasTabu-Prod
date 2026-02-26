import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

export const Modal = ({
  isOpen,
  title,
  onClose,
  children,
  footer,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title fw-bold tabu-text-primary">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">{children}</div>

          {footer && <div className="modal-footer border-top-0">{footer}</div>}
        </div>
      </div>
    </div>
  );
};
