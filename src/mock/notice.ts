import { NoticeType } from "../libs/types";

export const NoticeList = (): NoticeType[] => ([
  {
    idx: 0,
    title: "테스트 공지사항",
    content: "테스트 테스트 테스트 테스트",
    noticeLink: "/notice/0",
    createdAt: new Date()
  },
  {
    idx: 1,
    title: "테스트 공지사항",
    content: "테스트 테스트 테스트 테스트",
    noticeLink: "/notice/1",
    createdAt: new Date()
  },
  {
    idx: 2,
    title: "테스트 공지사항",
    content: "테스트 테스트 테스트 테스트",
    noticeLink: "/notice/2",
    createdAt: new Date()
  },
  {
    idx: 3,
    title: "테스트 공지사항",
    content: "테스트 테스트 테스트 테스트",
    noticeLink: "/notice/3",
    createdAt: new Date()
  },
]);