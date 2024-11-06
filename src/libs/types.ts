export type ThemeType = {
  colors: { [keys: string]: string }
};

export type NoticeType = {
  idx: number;
  createdAt: Date;
  title: string;
  content: string;
  noticeLink: string;
};