import React, { useEffect, useRef } from "react";
import { X, Layers3 } from "lucide-react";

export default function Modal({ title, subtitle, children, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current.focus();
    const handler = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const elements = dialog.current.querySelectorAll(
          "button, input, select, textarea",
        );
        const first = elements[0],
          last = elements[elements.length - 1];
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === dialog.current)
        ) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handler);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <div
      className="overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        tabIndex={-1}
        ref={dialog}
      >
        <button
          className="icon-button close"
          aria-label="Fechar"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <div className="modal-symbol">
          <Layers3 size={24} />
        </div>
        <h2 id="dialog-title">{title}</h2>
        <p className="muted">{subtitle}</p>
        {children}
      </section>
    </div>
  );
}
