interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function PopUp({ isOpen, onClose, children }: PopUpProps) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}
