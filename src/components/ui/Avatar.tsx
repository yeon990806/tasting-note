/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { forwardRef } from "react";

type ImgSizeType = "sm" | "md" | "lg";

const getImgSize = (size: ImgSizeType) => {
  switch (size) {
    case "sm":
      return "width: 24px; height: 24px";
    case "md":
      return "width: 36px; height: 36px";
    case "lg":
      return "width: 48px; height: 48px";
  }
};

const profileImagestyle = (img: string, size: ImgSizeType) => css`
  ${getImgSize(size)}
  border-radius: 50%;
  background-image: url(${img});
  background-size: 100%;
  background-position: center;
`;

interface AvatarProps {
  profileImage: string;
  userName: string;
  size: ImgSizeType;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const {
    profileImage,
    userName,
    size
  } = props;

  return (
    <div>
      <div css={profileImagestyle(profileImage, size)} />
      <h2>
        { userName }
      </h2>
    </div>
  );
});

Avatar.displayName = "Avatar";
export default Avatar;