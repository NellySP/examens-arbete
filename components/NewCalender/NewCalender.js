import * as S from "./NewCalender.styled";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { addDays } from "date-fns";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  parse,
  startOfToday,
  getDay,
  isEqual,
  isToday,
  isSameMonth,
} from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NewCalender = ({ session }) => {
  const [fetchError, setFetchError] = useState(null);
  const supabase = useSupabaseClient();
  const user = useUser();
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  useEffect(() => {}, [session]);

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  // Check if date and user already exist in database. If not. Add new row.

  async function addAvailableDate() {
    const date_input = format(selectedDay, "yyyy-MM-dd");
    console.log(date_input + " Hej");

    const { data, error } = await supabase
      .from("available_dates")
      .select()
      .or(`and(date.eq.${date_input},user_id.eq.${user.id})`);

    if (error) {
      setFetchError("Välj ett datum");
    }

    // if data is returned, check length

    if (data) {
      data.length;
      setFetchError(null);
    }
    // if length of returned array = 0, insert submitted data

    if (data == 0) {
      const { data, error } = await supabase
        .from("available_dates")
        .insert({ date: date_input, user_id: user.id });
    }
    error;
  }

  return (
    <S.calenderDiv>
      {session ? (
        <S.calenderSection>
          <S.h2>{format(firstDayCurrentMonth, "MMMM yyyy")}</S.h2>
          <button onClick={previousMonth}>Förra månaden</button>
          <button onClick={nextMonth}>Nästa månad</button>
          <S.calenderMenu>
            {/* grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500"> */}
            <S.calenderBox>M</S.calenderBox>
            <S.calenderBox>T</S.calenderBox>
            <S.calenderBox>O</S.calenderBox>
            <S.calenderBox>T</S.calenderBox>
            <S.calenderBox>F</S.calenderBox>
            <S.calenderBox>L</S.calenderBox>
            <S.calenderBox>S</S.calenderBox>
          </S.calenderMenu>
          <S.calenderGrid>
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={classNames(
                  dayIdx === 0 && `columns${[getDay(day)]}`
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={classNames(
                    isEqual(day, selectedDay) && "test",
                    !isEqual(day, selectedDay) && isToday(day) && "test",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "test",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "test",
                    isEqual(day, selectedDay) && isToday(day) && "test",
                    isEqual(day, selectedDay) && !isToday(day) && "test",
                    !isEqual(day, selectedDay) && "test",
                    (isEqual(day, selectedDay) || isToday(day)) && "test",
                    "test"
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </button>
              </div>
            ))}

            {console.log(selectedDay)}
          </S.calenderGrid>
          <S.calenderButton onClick={addAvailableDate}>
            Add date
          </S.calenderButton>
          {fetchError}
        </S.calenderSection>
      ) : (
        <S.calenderSection>
          <p>Du är inte inloggad. </p>
          <Link href="/">Logga in här</Link>
        </S.calenderSection>
      )}
    </S.calenderDiv>
  );
};

export default NewCalender;
