import { createContext, useContext } from 'react';

import { Chapter } from '~/types/chapterType.ts';
import { Comic } from '~/types/comicType.ts';

export interface ReadingLayoutContextType {
  comic?: Comic | null;
  chapters: Chapter[];
  chapterPagination?: {
    current: Chapter | null;
    previous: Chapter | null;
    next: Chapter | null;
  };
  content: Chapter['content'];
  headerVisibility: boolean;
  setHeaderVisibility: (value: boolean) => void;
  toggleHeaderVisibility: () => void;
}

const defaultValues: ReadingLayoutContextType = {
  comic: null,
  chapters: [],
  chapterPagination: {
    current: null,
    previous: null,
    next: null,
  },
  content: [],
  headerVisibility: true,
  setHeaderVisibility: () => {},
  toggleHeaderVisibility: () => {},
};

export const ReadingLayoutContext = createContext<ReadingLayoutContextType>(defaultValues);

export const ReadingLayoutContextProvider = ReadingLayoutContext.Provider;

export const useReadingLayoutContext = () => useContext(ReadingLayoutContext);
