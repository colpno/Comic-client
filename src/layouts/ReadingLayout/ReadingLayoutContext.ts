import { createContext, useContext } from 'react';

export interface ReadingLayoutContextType {
  headerVisibility: boolean;
  setHeaderVisibility: (value: boolean) => void;
  toggleHeaderVisibility: () => void;
}

const defaultValues: ReadingLayoutContextType = {
  headerVisibility: true,
  setHeaderVisibility: () => {},
  toggleHeaderVisibility: () => {},
};

export const ReadingLayoutContext = createContext<ReadingLayoutContextType>(defaultValues);

export const ReadingLayoutContextProvider = ReadingLayoutContext.Provider;

export const useReadingLayoutContext = () => useContext(ReadingLayoutContext);
