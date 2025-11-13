import { createContext, useContext } from "react";
import type { AlertMessage, AlertType } from "../types";

interface AlertContextType {
  alerts: AlertMessage[];
  addAlert: (type: AlertType, message: string, duration?: number) => void;
  removeAlert: (id: string) => void;
}

export const AlertContext = createContext<AlertContextType>({
  alerts: [],
  addAlert: () => {},
  removeAlert: () => {},
});

export const useAlertsContext = () => useContext(AlertContext);

