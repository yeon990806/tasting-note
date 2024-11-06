/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react'
import AppTitle from './AppTitle';

const appBarStyle = (bgColor: string) => css`
  padding: 16px;
  background: ${bgColor};
`;

const AppBar = () => {
  const theme = useTheme();

  return (
    <header css={appBarStyle(theme.colors.neutral100)}>
      <AppTitle />
    </header>
  );
};
export default AppBar;