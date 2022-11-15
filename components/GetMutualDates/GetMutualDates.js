import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./GetMutualDates.styled";
import Image from "next/image";

const GetMutualDates = ({ session, friendId, friendName, friendAvatar }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetchAvailableDates(friendId);
    getGroupDates();
  }, [session]);

  console.log(friendAvatar);

  // Fetch group date

  async function getGroupDates() {
    const { data, error } = await supabase
      .from("group_relations")
      .select()
      .eq("user_id", user.id);
    console.log(data);
  }

  // Fetch available dates here

  const fetchAvailableDates = async (friendId) => {
    const { data, error } = await supabase.rpc("testing_five", {
      user_id_input: user.id,
      friend_id_input: friendId,
    });
    const currentDate = [];

    for (let i = 0; i < data.length; i++) {
      const date = data[i].date;
      currentDate.push(date);
    }
    setDates(currentDate);
  };
  if (!dates.length) {
    return null;
  }
  return (
    <div>
      {dates && (
        <S.dateDiv>
          {friendAvatar ? (
            <S.imageWrapper>
              <Image
                src={`https://zsmobqgplqouebjzyqmy.supabase.co/storage/v1/object/public/avatars/${friendAvatar}`}
                width={100}
                height={100}
              ></Image>
            </S.imageWrapper>
          ) : (
            <S.imageWrapper>
              <Image src="/profilepicture.png" width={100} height={100}></Image>
            </S.imageWrapper>
          )}
          <h3>{friendName}</h3>
          {dates.map((date) => (
            <div key={date}>
              <p>{date}</p>
            </div>
          ))}
        </S.dateDiv>
      )}
    </div>
  );
};

export default GetMutualDates;
