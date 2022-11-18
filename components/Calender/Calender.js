import * as S from "./Calender.styled";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
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
  isSameDay,
  parseISO,
} from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Calender = ({ session }) => {
  const [fetchError, setFetchError] = useState(null);
  const supabase = useSupabaseClient();
  const user = useUser();
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState();
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  let [sameDate, setSameDate] = useState([]);
  const [left, setLeft] = useState();
  const [right, setRight] = useState();

  useEffect(
    () => {
      setLeft("<");
      setRight(">");
      fetchAvailableDate();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [session],
    [sameDate]
  );

  // Remove error message after 5 seconds
  setTimeout(function () {
    setFetchError(null);
  }, 5000);

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

  // Add selected date to database
  async function addAvailableDate() {
    if (selectedDay) {
      const date_input = format(selectedDay, "yyyy-MM-dd");

      // Fetch dates from database
      const { data, error } = await supabase
        .from("available_dates")
        .select()
        .or(`and(date.eq.${date_input},user_id.eq.${user.id})`);

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
        fetchAvailableDate();
        // This is not an error.
        setFetchError("Datumet inlagt!");
      }
      // If data is 1 it means the date is already in DB.
      if (data.length == 1) {
        setFetchError("Du har redan lagt in det här datumet");
      }
    } else {
      setFetchError("Du har inte valt något datum");
    }
  }

  async function removeAvailableDate() {
    const date_input = format(selectedDay, "yyyy-MM-dd");
    console.log(date_input);
    const { data, error } = await supabase
      .from("available_dates")
      .delete()
      .or(`and(date.eq.${date_input},user_id.eq.${user.id})`);
    fetchAvailableDate();
    setFetchError("Datum borttaget!");
  }

  // Fetch from database
  async function fetchAvailableDate() {
    const emptyarray = [];
    const { data, error } = await supabase
      .from("available_dates")
      .select()
      .eq(`user_id`, user.id);

    for (let i = 0; i < data.length; i++) {
      emptyarray.push(data[i].date);
    }
    // filters the array
    emptyarray.filter((sameDay) =>
      isSameDay(parseISO(sameDay.date), selectedDay)
    );
    setSameDate(emptyarray);
  }

  return (
    <S.calenderDiv>
      <h2>Kalender</h2>
      <p>Här kan du lägga till och ta bort dina lediga datum.</p>
      <S.calenderSection>
        <S.buttonWrapper>
          <button onClick={previousMonth}>{left}</button>
          <h2>{format(firstDayCurrentMonth, "MMMM yyyy")}</h2>
          <button onClick={nextMonth}>{right}</button>
        </S.buttonWrapper>
        <S.calenderMenu>
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
              className={classNames(dayIdx === 0 && `columns${[getDay(day)]}`)}
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedDay(day);
                }}
                className={classNames(
                  isEqual(day, selectedDay) && "pushed",
                  !isEqual(day, selectedDay) && isToday(day) && "today",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    "standard",
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "standard",
                  isEqual(day, selectedDay) && isToday(day) && "standard",
                  isEqual(day, selectedDay) && !isToday(day) && "standard",
                  !isEqual(day, selectedDay) && "standard",
                  (isEqual(day, selectedDay) || isToday(day)) && "standard",
                  "standard",
                  sameDate.some((sameDay) =>
                    isSameDay(parseISO(sameDay), day)
                  ) && "newClass"
                )}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </button>
            </div>
          ))}
        </S.calenderGrid>
        {
          <S.calenderButtonWrapper>
            {sameDate.some((sameDay) =>
              isSameDay(parseISO(sameDay), selectedDay)
            ) ? (
              <S.calenderButton
                inputColor="#94716d"
                onClick={removeAvailableDate}
              >
                Ta bort datum
              </S.calenderButton>
            ) : (
              <S.calenderButton onClick={addAvailableDate}>
                Lägg till datum
              </S.calenderButton>
            )}
          </S.calenderButtonWrapper>
        }
        <p>{fetchError}</p>
      </S.calenderSection>
    </S.calenderDiv>
  );
};

export default Calender;
