import "./alertStyles.css";
import { X, CheckCircle, ParkingCircle } from "lucide-react";
import type { AlertMessage, AlertType } from "../../../types";
import { useAlerts } from "../../../hook/useAlert";

interface CustomAlertProps extends AlertMessage {
  onClose: (id: string) => void;
}

const IconMap: Record<AlertType, React.ReactElement> = {
  success: <CheckCircle size={20} />,
  error: <X size={20} />,
  warning: <ParkingCircle size={20} />,
};

const CustomAlert: React.FC<CustomAlertProps> = ({
  id,
  type,
  message,
  onClose,
}) => {
  const IconComponent = IconMap[type];

  return (
    <div className={`alert-content ${type} fade-out`}>
      <div className="alert-container__icon">
        <span>{IconComponent}</span>
      </div>
      <p className="custom-alert__message">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="custom-alert__close-btn"
        aria-label="Cerrar alerta"
      >
        <X size={18} />
      </button>
    </div>
  );
};

const AlertDisplay = () => {
  const { alerts, removeAlert } = useAlerts();

  return (
    <div className="alert-stack">
      {alerts.map((alert) => (
        <CustomAlert
          key={alert.id}
          {...alert}
          onClose={removeAlert}
        ></CustomAlert>
      ))}
    </div>
  );
};

export default AlertDisplay;
