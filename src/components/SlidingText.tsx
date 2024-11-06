import { css } from "@emotion/css";
import { useLayoutEffect, useMemo, useRef } from "react";

interface SlidingTextProps<T> {
  textList?: T[];
  time?: number;
  visibleKey?: keyof T;
  className?: string;
}

const containerStyle = css`
  position: relative;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  height: 40px;
  padding: 0 8px;
  overflow: scroll;
  pointer-events: none;

  ::-webkit-scrollbar {
    display: none;
  }

  div {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
  }
`;

const SlidingText = <T,>({
  textList = [],
  time = 3000,
  visibleKey,
}: SlidingTextProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIdx = useRef<number>(0);

  const cachedList = useMemo(() => textList, [textList]);

  if (!cachedList?.length) {
    return null;
  }

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      const item = containerRef.current?.querySelector(`.sliding-${currentIdx.current}`);
      console.log(item);
      item?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });

      if (currentIdx.current < cachedList?.length - 1) currentIdx.current++;
      else currentIdx.current = 0;
    }, time);

    return () => clearInterval(interval);
  }, [cachedList, time]);

  return (
    <div
      className={containerStyle}
      ref={containerRef}
    >
      {cachedList.map((text, index) => (
        <div key={`sliding-${index}`} className={`sliding-${index}`}>
          {visibleKey ? (text as Record<string, unknown>)[visibleKey] : text} {index}
        </div>
      ))}
    </div>
  );
};

export default SlidingText;