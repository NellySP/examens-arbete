import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./GetMutualDates.styled";
import Image from "next/image";

const GetMutualDates = ({
  session,
  friendId,
  friendName,
  friendAvatar,
  friendUserName,
}) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetchAvailableDates(friendId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

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
    <>
      {dates && (
        <S.dateDiv>
          <S.userWrapper>
            {friendAvatar ? (
              <S.imageWrapper>
                <Image
                  src={`https://zsmobqgplqouebjzyqmy.supabase.co/storage/v1/object/public/avatars/${friendAvatar}`}
                  width={50}
                  height={50}
                  alt="profilbild"
                ></Image>
              </S.imageWrapper>
            ) : (
              <S.imageWrapper>
                <Image
                  src="/profilepicture.png"
                  width={50}
                  height={50}
                  alt="profilbild"
                ></Image>
              </S.imageWrapper>
            )}
            <S.textWrapper>
              <h4>{friendUserName}</h4>
              <p>{friendName}</p>
            </S.textWrapper>
          </S.userWrapper>
          <S.dateWrapper>
            {dates.map((date) => (
              <div key={date}>
                <S.p>{date}</S.p>
              </div>
            ))}
          </S.dateWrapper>
        </S.dateDiv>
      )}
    </>
  );
};

export default GetMutualDates;
