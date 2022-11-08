import { isSameDay, parseISO } from "date-fns";
import { useEffect } from "react";

const RegisteredDatesInDatabase = ({ sameDate, day }) => {
  useEffect(() => {}, [sameDate, day]);
  return (
    <div>
      {sameDate.some((sameDay) => isSameDay(parseISO(sameDay), day)) && (
        <div className="registeredDate"></div>
      )}{" "}
    </div>
  );
};

export default RegisteredDatesInDatabase;
