import { useState } from "react";
import { useAuthStore } from "../../store/GymUserStore";
import CustomButton from "../iu/CustomButton/CustomButton";
import {
  CircleUser,
  Settings,
  LogOut,
  ChevronsDown,
  ChevronsUp,
} from "lucide-react";
import "./header.css";

import { useNavigate } from "react-router";
const Header = () => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const closeOnBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // Solo cierra si realmente el foco salió del componente principal
    if (!e.currentTarget?.contains(e.relatedTarget) && isOpen) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header id="header">
      <div className="header-logo">
        <img className="logo-icon" src="/favicon.ico" alt="logo" />
        <a className="logo-title" href="/">
          Zylo
        </a>
      </div>
      <div className="drawer" onBlur={closeOnBlur} tabIndex={0}>
        <span className="icon-drawer" onClick={toggleDrawer}>
          {isOpen ? <ChevronsDown /> : <ChevronsUp />}
        </span>

        <div className={`drawer-content ${isOpen ? "is-open" : ""}`}>
          <div className="drawer-content__top">
            <div className="user-info">
              <span className="user-avatar">
                <CircleUser size={20} />
              </span>
              <div className="user">
                <span className="user-name">{user?.username}</span>
                <span className="user-email">{user?.email}</span>
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="drawer-content__bottom">
            <div className="btn-drawer__container">
              <div className="btn-drawer__items">
                <CustomButton
                  icon={<Settings size="20px" />}
                  iconPosition="end"
                  size="small"
                  appearance="outline"
                  backgroundColor="secondary"
                >
                  Configuración
                </CustomButton>

                <CustomButton
                  icon={<LogOut size="20px" />}
                  iconPosition="end"
                  size="small"
                  appearance="ghost"
                  backgroundColor="danger"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
