import { createContext, useContext } from 'react';

import { Chapter, Comic } from '~/types/index.ts';

export interface ReadingLayoutContextType {
  comic?: Pick<Comic, 'id' | 'title' | 'coverImageUrl'>;
  chapter?: Chapter;
  pagination: {
    previous?: string;
    next?: string;
  };
  headerVisibility: boolean;
  setHeaderVisibility: (value: boolean) => void;
  toggleHeaderVisibility: () => void;
}

const defaultValues: ReadingLayoutContextType = {
  pagination: {
    previous: undefined,
    next: undefined,
  },
  headerVisibility: true,
  setHeaderVisibility: () => {},
  toggleHeaderVisibility: () => {},
};

export const ReadingLayoutContext = createContext<ReadingLayoutContextType>(defaultValues);

export const ReadingLayoutContextProvider = ReadingLayoutContext.Provider;

export const useReadingLayoutContext = () => useContext(ReadingLayoutContext);
