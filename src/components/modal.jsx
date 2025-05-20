import React, { useEffect, useState } from "react";
import "../styles/modal.css";

const Modal = ({ isOpen, objectData, onClose, objImage }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [closing, setClosing] = useState(false);

  // Controla la aparición/desaparición con animación
  useEffect(() => {
    if (isOpen && objectData) {
      setShouldRender(true);
      setClosing(false);
    } else if (shouldRender) {
      // Comienza animación de salida
      setClosing(true);
      const timeout = setTimeout(() => {
        setShouldRender(false);
        setClosing(false);
      }, 300); // Duración de la animación de salida
      return () => clearTimeout(timeout);
    }
  }, [isOpen, objectData]);

  if (!shouldRender || !objectData) return null;

  const backgroundColor = objectData.color;
  const textColor = getContrastColor(backgroundColor);

  const modalStyle = {
    backgroundColor,
    color: textColor,
  };

  return (
    <div className={`modal-panel ${closing ? "closing" : ""}`} style={modalStyle}>
      <h3>{objectData.object}</h3>
      <p><strong>Frecuencia:</strong> {objectData.frecuencia.toFixed(2)}</p>
      <p><strong>FOV:</strong> {objectData.fovCategory}</p>
      <p><strong>RA:</strong> {objectData.theta.toFixed(2)}°</p>
      <p><strong>Dec:</strong> {objectData.r.toFixed(2)}°</p>
      <p>ID: {objectData.id}</p>

        <img
          src={`../../public/img/${objectData.id}.jpg`}
          alt={objectData.object}
          className="modal-image"
        />


      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

// Reutiliza la función para contraste
function getContrastColor(hexColor) {
  const color = hexColor.replace("#", "");
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? "#000000" : "#ffffff";
}

export default Modal;
