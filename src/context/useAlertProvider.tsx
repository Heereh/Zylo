import AlertDisplay from "../component/iu/AlertsUI/AlertsUI";
import { useAlerts } from "../hook/useAlert";
import { AlertContext } from "./useContextAlert";

export const AlertProvider = ({ children }) => {
  const { alerts, addAlert, removeAlert } = useAlerts();

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
      {children}
      <AlertDisplay></AlertDisplay>
    </AlertContext.Provider>
  );
};
