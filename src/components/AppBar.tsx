/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react'
import AppTitle from './AppTitle';
import useAuthStore from '../store/AuthStore';
import Avatar from './ui/Avatar';

const appBarStyle = (bgColor: string) => css`
  padding: 16px;
  background: ${bgColor};
`;

const AppBar = () => {
  const theme = useTheme();
  const authStore = useAuthStore();

  return (
    <header css={appBarStyle(theme.colors.neutral100)}>
      <AppTitle />
      <Avatar
        userName={authStore?.userInfo?.displayName || ""}
        profileImage=""
        size="md"
      />
    </header>
  );
};
export default AppBar;