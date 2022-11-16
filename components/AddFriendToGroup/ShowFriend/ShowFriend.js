import React from "react";
import * as S from "../AddFriendToGroup.styled";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import AddFriend from "./AddFriend/AddFriend";

const ShowFriend = ({
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
  const [openAddUser, setOpenAddUser] = useState(false);
  const [userNotInGroup, setUserNotInGroup] = useState();

  useEffect(() => {
    setOpenAddUser(false);
    checkifFriendIsAlreadyInGroup();
  }, [session]);

  async function checkifFriendIsAlreadyInGroup() {
    const { data, error } = await supabase
      .from("group_relations")
      .select()
      .or(`and(user_id.eq.${friendId},group_id.eq.${groupId})`);

    const emptyArray = [];

    if (data.length == 0) {
      console.log("hej");
      setUserNotInGroup(true);
    }
    if (data.length) {
      console.log(JSON.stringify(data) + "Här borde vi ha användare");
      emptyArray.push(data); // De här personerna finns i gruppen!!!!
      setUserNotInGroup(false);
    }
  }

  return (
    <>
      {userNotInGroup && (
        <AddFriend
          friendId={friendId}
          friendName={friendName}
          friendUsername={friendUsername}
          friendAvatar={friendAvatar}
          groupId={groupId}
        ></AddFriend>
      )}
    </>
  );
};

export default ShowFriend;
