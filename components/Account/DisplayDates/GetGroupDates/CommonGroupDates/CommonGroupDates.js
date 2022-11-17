import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./CommonGroupDates.styled";

const CommonGroupDates = ({ session, groupId, allInGroup }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [allDates, setAllDates] = useState([]);

  useEffect(() => {
    getMutualGroupDates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const getMutualGroupDates = async () => {
    const { data, error } = await supabase.rpc("get_dates_from_group", {
      group_id_input: groupId,
      group_members_input: allInGroup,
    });

    const emptyArray = [];
    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        const date = data[i].date;
        emptyArray.push(date);
      }

      setAllDates(emptyArray);
    }
    if (!data.length) {
      setAllDates(null);
    }
  };

  return (
    <S.Wrapper>
      {allDates && (
        <>
          {allDates.map((date) => (
            <S.dateWrapper key={date}>
              <p> {date} </p>
            </S.dateWrapper>
          ))}
        </>
      )}
    </S.Wrapper>
  );
};

export default CommonGroupDates;
