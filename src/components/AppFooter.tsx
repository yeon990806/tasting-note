import { css } from "@emotion/css";
import { NoticeList } from "../mock/notice";
import SlidingText from "./SlidingText";
import { useTheme } from "@emotion/react";

const AppFooterStyle = (bgColor: string) => css`
  background-color: ${bgColor};
`;

const AppFooter = () => {
  const noticeList = NoticeList();
  const theme = useTheme();


  return (
    <footer className={AppFooterStyle(theme.colors.neutral100)}>
      <SlidingText
        textList={noticeList}
        direction="vertical"
        time={2000}
        visibleKey="title"
      />
    </footer>
  );
};
export default AppFooter;