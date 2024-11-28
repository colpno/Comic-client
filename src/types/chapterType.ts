export interface Chapter {
  id: string;
  title: string;
  volume?: number;
  chapter: number;
  content: ChapterContent[];
  publishAt?: string;
  readableAt?: string;
  pages?: number;
}

interface ChapterContent {
  data: string;
  dataSaver?: string;
}
