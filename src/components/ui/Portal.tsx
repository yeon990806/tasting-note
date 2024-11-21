import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode
}

const Portal = ({ children }: PortalProps) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const targetElem = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    setMounted(true);
    targetElem.current = document.querySelector("#portal");
  }, [])

  if (!mounted || !targetElem.current) null;

  return createPortal(children, targetElem.current!);
};
export default Portal;