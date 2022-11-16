import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
// import * as S from "./CommonGroupDates.styled";
import Image from "next/image";

const CommonGroupDates = ({ session, groupId }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [allDates, setAllDates] = useState([]);
  const [openAddUser, setOpenAddUser] = useState(false);

  useEffect(() => {}, [session], allDates);

  const getMutualGroupDates = async () => {
    const { data, error } = await supabase.rpc("get_dates_from_group", {
      group_id_input: groupId,
      group_members_input: allInGroup,
    });
    console.log(allInGroup);
    const emptyArray = [];
    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        const date = data[i].date;
        console.log(date);
        emptyArray.push(date);
      }
      setAllDates(emptyArray);
    }
    if (!data.length) {
      setAllDates(null);
    }
  };
  console.log(allDates);

  return (
    <div>
      <p>hej</p>
    </div>
  );
};

export default CommonGroupDates;
