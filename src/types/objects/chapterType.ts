interface ChapterContent {
  data: string;
  dataSaver?: string;
}

export interface Chapter {
  id: string;
  title: string;
  volume?: string;
  chapter?: string;
  content: ChapterContent[];
  publishAt?: string;
  readableAt?: string;
  pages?: number;
}
