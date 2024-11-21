import { css } from "@emotion/react";
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import { DAY_LABEL } from "../../libs";
import { db } from "../../libs/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import useAuthStore from "../../store/AuthStore";
import Theme from "../../styles/Theme";

interface HeatMapProps {
  currentYear: number;
}

const containerStyle = css`
  display: grid;
  grid-template-columns: repeat(53, 1fr);
  grid-template-rows: auto repeat(7, 1fr);
  row-gap: 16px;
  column-gap: 24px;
`;

const dayLabelStyle = css`
  grid-column: 1;
  grid-row: 2 / span 7;
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  justify-content: center;
  align-items: center;
  font-size: 10px;
  text-align: right;
  gap: 4px;
`;

const monthLabelStyle = css`
  display: grid;
  grid-row: 1;
  grid-column: 2 / span 53;
  grid-template-columns: repeat(53, 1fr);
  font-size: 10px;
  gap: 4px;
  overflow: hidden;
`;

const heatmapGridStyle = css`
  grid-column: 2 / span 53;
  grid-row: 2 / -1;
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  grid-auto-flow: column;
  gap: 4px;

  > div:not(.null-cell) {
    width: calc(100% / 53 - (8 * 52));
    aspect-ratio: 1 / 1;
    border: 1px solid ${Theme.colors.blue50};
    border-radius: 2px;
  }
`;

const HeatMap = forwardRef<HTMLDivElement, HeatMapProps>(({ currentYear }, ref) => {
  const userId = useAuthStore()?.userInfo?.uid;
  const maxValue = useRef<number>(0);
  const [emptyCells, setEmptyCells] = useState<number[]>([]);
  const [yearData, setYearData] = useState<{ date: string, value: number }[]>([
    { date: '2024-11-11', value: 5 },
    { date: '2024-11-12', value: 11 },
  ]);

  const generateFullYearDates = (): string[] => {
    const startDate = new Date(Date.UTC(currentYear, 0, 1));
    const endDate = new Date(Date.UTC(currentYear, 11, 31));
    const dateArray: string[] = [];
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      const formattedDate = currentDate.toISOString().split("T")[0];
      dateArray.push(formattedDate);
      currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }
  
    return dateArray;
  };
  
  const getMonthStartColumns = (): number[] => {
    const firstDayOfYear = new Date(currentYear, 0, 1);
    const columns = [];
  
    for (let month = 0; month < 12; month++) {
      const firstDayOfMonth = new Date(currentYear, month, 1);
      const days = Math.floor((firstDayOfMonth.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000));
      columns.push(Math.ceil((days + firstDayOfYear.getDay() + 1) / 7 + (firstDayOfMonth.getDay() > 3 ? 1 : 0)));
    }
  
    return columns;
  };

  useLayoutEffect(() => {
    const firstDay = new Date(currentYear, 0, 1).getDay();

    const fetchYearData = async () => {
      const docs = await getDocs(query(collection(db, "record")));
      console.log(docs);
    };

    setEmptyCells(Array.from({ length: firstDay }, (_, i) => i));
    fetchYearData();
  }, [currentYear]);

  useEffect(() => {
    maxValue.current = yearData.reduce((acc, cur) => Math.max(acc, cur.value), 0);
  }, [yearData])

  return (
    <div ref={ref} css={containerStyle}>
      <div css={dayLabelStyle}>
        {DAY_LABEL.map((label, i) => (
          <div key={`day-label-${i}`}>{label}</div>
        ))}
      </div>

      <div css={monthLabelStyle}>
        {getMonthStartColumns().map((start, i) => (
          <div
            key={`month-label-${i + 1}`}
            css={css`
              grid-column: ${start} / ${getMonthStartColumns()[i + 1] || 54};
            `}
          >
            {`${i + 1}월`}
          </div>
        ))}
      </div>

      <div css={heatmapGridStyle}>
        {emptyCells.map((_, i) => (
          <div key={`empty-cell-${i}`} className="null-cell" />
        ))}
        {generateFullYearDates().map((date) => (
          <div
            key={`date-cell-${date}`}
            data-date={date}
            style={{ backgroundColor: `rgba(37,99,235, ${yearData.find((v: any) => v.date === date) ? yearData.find((v: any) => v.date === date)!.value / maxValue.current : 0.01})`}}
          />
        ))}
      </div>
    </div>
  );
});

HeatMap.displayName = "HeatMap";
export default HeatMap;
