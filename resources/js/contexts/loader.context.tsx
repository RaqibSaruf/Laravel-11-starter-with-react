import React, { createContext, useState, ReactNode } from 'react';

interface LoaderContextType {
  loading: boolean;
  setLoader: (value: boolean) => void;
}

export const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const setLoader = (value: boolean) => setLoading(value);

  return <LoaderContext.Provider value={{ loading, setLoader }}>{children}</LoaderContext.Provider>;
};
