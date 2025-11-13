import { useCallback, useState } from "react";
import type { AlertMessage, AlertType } from "../types";

export const useAlerts = () => {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const removeAlert = useCallback((id: string) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  }, []);

  const addAlert = useCallback(
    (type: AlertType, message: string, duration: number = 4000) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newAlert: AlertMessage = { id, type, message, duration };
      setAlerts((prevAlerts) => [newAlert, ...prevAlerts]);

      setTimeout(() => {
        removeAlert(id);
      }, duration);

      return id;
    },
    [removeAlert],
  );

  return { alerts, addAlert, removeAlert };
};
