import { isSameDay, parseISO } from "date-fns";
import { useEffect } from "react";

const DatesInDatabse = ({ sameDate, day }) => {
  useEffect(() => {}, [sameDate, day]);
  return (
    <div>
      {sameDate.some((sameDay) => isSameDay(parseISO(sameDay), day)) && (
        <div className="selectedDayTest"></div>
      )}{" "}
    </div>
  );
};

export default DatesInDatabse;
