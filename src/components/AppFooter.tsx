import { css } from "@emotion/css";
import { NoticeList } from "../mock/notice";
import { useTheme } from "@emotion/react";

const AppFooterStyle = (bgColor: string) => css`
  background-color: ${bgColor};
`;

const AppFooter = () => {
  const noticeList = NoticeList();
  const theme = useTheme();


  return (
    <footer className={AppFooterStyle(theme.colors.neutral100)}>
    </footer>
  );
};
export default AppFooter;