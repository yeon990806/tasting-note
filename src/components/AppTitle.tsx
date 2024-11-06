/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { APP_TITLE } from "../libs/const";

const AppTitleStyle = css`
  font-size: 16px;
  font-weight: 500;
  pointer-events: none;
  user-select: none;
`;

const AppTitle = () => {
  const theme = useTheme();
  
  return (
    <h1 css={AppTitleStyle} style={{ color: theme.colors.blue500 }}>
      { APP_TITLE }
    </h1>
  );
};
export default AppTitle;