import { ReactNode } from "react";

export type ThemeType = {
  colors: { [keys: string]: string }
};

export type InputTextType =  "Normal" | "Danger" | "Warning" | "Info";

export const SignType = {
  Google: 0,
  Credential: 1
} as const;

export type SignTypeValue = typeof SignType[keyof typeof SignType];

export type NoticeType = {
  idx: number;
  createdAt: Date;
  title: string;
  content: string;
  noticeLink: string;
};

export type InputDescType = {
  type: InputTextType;
  text: string;
  icon?: ReactNode
};
