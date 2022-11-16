import React from "react";
import * as S from "../../../AddFriendToGroup/AddFriendToGroup.styled";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";

const AddFriend = ({
  session,
  groupId,
  friendId,
  friendName,
  friendUsername,
  friendAvatar,
}) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [message, setMessage] = useState();

  useEffect(() => {}, [session]);

  async function addFriendToGroup(friendId) {
    const { data, error } = await supabase
      .from("group_relations")
      .insert({ group_id: groupId, user_id: friendId });
    // setMessage(`Vän tillagd i ${groupName}`);
  }

  setTimeout(function () {
    setMessage(null);
  }, 5000);

  return (
    <S.profileWrapper>
      <S.groupWrapperDiv>
        {friendAvatar ? (
          <S.imageWrapper>
            <Image
              src={`https://zsmobqgplqouebjzyqmy.supabase.co/storage/v1/object/public/avatars/${friendAvatar}`}
              width={50}
              height={50}
            ></Image>
          </S.imageWrapper>
        ) : (
          <S.imageWrapper>
            <Image src="/profilepicture.png" width={50} height={50}></Image>
          </S.imageWrapper>
        )}

        <S.textWrapper>
          <p> {friendUsername} </p>
          <p>{friendName}</p>
        </S.textWrapper>
      </S.groupWrapperDiv>
      <S.addFriendButton
        onClick={() => {
          addFriendToGroup(friendId);
        }}
      >
        +
      </S.addFriendButton>
    </S.profileWrapper>
  );
};

export default AddFriend;
