/** @jsxImportSource @emotion/react */
import { css, keyframes, useTheme } from "@emotion/react";
import { APP_TITLE } from "../../libs/const";
import Input from "../../components/ui/Input";
import { useState } from "react";
import useSignIn from "../../hooks/useSignIn";
import { SignType, SignTypeValue } from "../../libs/types";

const fadeInSlidingUp = (val: number = 50) => keyframes`
  from {
    opacity: 0;
    transform: translateY(${val}%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SignInStyle = (bgColor: string) => css`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${bgColor};
`;

const TitleStyle = (color: string) => css`
  color: ${color};
  font-weight: 500;
  font-size: max(max(4vh, 16px), 24px);
  animation: ${fadeInSlidingUp()} 1s ease-in-out;
  animation-delay: 0.4s;
  animation-fill-mode: forwards;
  user-select: none;
  pointer-events: none;
  cursor: default;
  opacity: 0;
  transition: 0.4s ease-in;
`;

const InputContainer = css`
  display: grid;
  gap: 16px;
  margin-top: 32px;
  animation: ${fadeInSlidingUp(10)} 1.5s ease-in-out;
  animation-delay: 1.6s;
  animation-fill-mode: forwards;
  opacity: 0;
  transition: 0.4s ease-in;
`;

const RouteSignIn = () => {
  const theme = useTheme();
  const {
    onSignIn
  } = useSignIn();
  const [userId, setUserId] = useState<string>("");
  const [userPw, setUserPw] = useState<string>("");

  const onSubmitSign = (t: SignTypeValue) => onSignIn(t, userId, userPw);

  return (
    <section css={SignInStyle(theme.colors.neutral100)}>
      <h1 css={TitleStyle(theme.colors.blue500)}>
        { APP_TITLE }
      </h1>
      <div css={InputContainer}>
        <Input
          label="Account"
          value={userId}
          setValue={setUserId}
        />
        <Input
          label="Password"
          type="password"
          value={userPw}
          setValue={setUserPw}
        />
        <button onClick={() => onSubmitSign(SignType.Credential)}>
          Sign in
        </button>
      </div>
    </section>
  );
};
export default RouteSignIn;