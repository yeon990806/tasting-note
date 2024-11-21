/** @jsxImportSource @emotion/react */
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import Portal from "../components/ui/Portal";
import { css } from "@emotion/react";

interface DialogContextProps {
  children: ReactNode
}

interface DialogContextValue {
  isOpen: boolean;
  openDialog: ({ node }: { node: ReactNode }) => void;
  closeDialog: () => void;
}
 
export const DialogContext = createContext<DialogContextValue>({
  isOpen: false,
  openDialog: () => {},
  closeDialog: () => {},
});

export const DialogProvider = ({ children }: DialogContextProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [node, setNode] = useState<ReactNode>(null);

  const openDialog = useCallback(({ node }: { node: ReactNode }) => {
    setNode(node);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setNode(null);
    setIsOpen(false);
  }, []);

  const value = useMemo((): DialogContextValue => {
    return {
      isOpen,
      openDialog,
      closeDialog,
    };
  }, [isOpen]);

  return (
    <DialogContext.Provider value={value}>
      {children}
      {isOpen && (
        <Portal>
          <div css={DialogBackground}>
            {node} 
          </div>
        </Portal>
      )}
    </DialogContext.Provider>
  );
};

const DialogBackground = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  backdrop-filter: blur(4px);
`;

export function useDialog () {
  const context = useContext(DialogContext);
  return context;
}