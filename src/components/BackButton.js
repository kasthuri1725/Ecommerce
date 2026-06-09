import { useNavigate } from "react-router-dom";
import "./BackButton.css";
import { Icon } from "@iconify/react";


export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      className="back-btn"
      onClick={() => navigate(-1)}
    >
        <Icon icon="mdi:keyboard-backspace" className="nav-icon" />
       Back
    </button>
  );
}