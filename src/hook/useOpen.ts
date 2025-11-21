import { useState } from "react";

export const useOpen = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    OpenUI: () => setIsOpen(true),
    CloseUI: () => setIsOpen(false),
  }
}
