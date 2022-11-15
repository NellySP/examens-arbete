import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const GroupDates = ({ session, friendId }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [dates, setDates] = useState([]);
  const [allDates, setAllDates] = useState([]);

  useEffect(() => {
    getMutualGroupDates();
  }, [session]);

  //Get mutual dates from group
  async function getMutualGroupDates() {
    const emptyArray = [];
    if (friendId) {
      const { data, error } = await supabase
        .from("available_dates")
        .select("date")
        .eq("user_id", friendId);

      for (let i = 0; i < data.length; i++) {
        const date = JSON.stringify(data[i].date);
        emptyArray.push(date);
      }
      setAllDates(emptyArray);
    }
    // console.log(allDates);
  }

  // Testing
  console.log(allDates);
  for (let i = 0; i < allDates.length; i++) {
    let count = 0;

    allDates.forEach((date) => {
      if (date === allDates[i]) {
        count += 1;
        if (count == 3) {
          console.log(date + "hej");
        }
      }
    });
    console.log(count);
  }

  // for (let i = 0; i < array.length; i++) {
  //   let count = 0;

  //   array.forEach((element) => {
  //     if (element === array[i]) {
  //       count += 1;
  //       if (count == 4) {
  //           console.log(element + "hej");
  //       }
  //     }
  //   });
  //   console.log(count);
  // }
  return (
    <>
      <p>Hej</p>
    </>
  );
};

export default GroupDates;
