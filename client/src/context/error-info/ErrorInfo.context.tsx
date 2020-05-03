import React, { createContext, useState, FC, useContext } from "react";

interface ErrorInfoState {
  isOpen: boolean;
  message: string | null;
}

interface ErrorInfoActions {
  setIsOpen: (message: string) => void;
  close: () => void;
}

type ErrorInfoContext = {
  state: ErrorInfoState;
  actions: ErrorInfoActions;
};

const ErrorInfoContextImpl = createContext<ErrorInfoContext>({
  state: { isOpen: false, message: null },
  actions: {
    setIsOpen: (_message: string) => {
      throw new Error("setIsOpen not initialized");
    },
    close: () => {
      throw new Error("close not initialized");
    },
  },
});

export const useErrorInfo = () => useContext(ErrorInfoContextImpl);

export const ErrorInfoProvider: FC = ({ children }) => {
  const [state, setState] = useState<ErrorInfoState>({
    isOpen: false,
    message: null,
  });

  const value = {
    state: { ...state },
    actions: {
      setIsOpen: (message: string) => {
        setState({ ...state, isOpen: true, message: message });
      },
      close: () => {
        setState({ ...state, isOpen: false, message: null });
      },
    },
  };

  return (
    <ErrorInfoContextImpl.Provider value={value}>
      {children}
    </ErrorInfoContextImpl.Provider>
  );
};
