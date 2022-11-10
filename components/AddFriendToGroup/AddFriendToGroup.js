import React from "react";
import * as S from "./AddFriendToGroup.styled";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import { fromUnixTime } from "date-fns";

const AddFriendToGroup = ({ session, group }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [friendId, setFriendId] = useState();
  const [message, setMessage] = useState();

  async function addFriendToGroup(event) {
    event.prevent.default;
    const [data, error] = await supabase
      .from("group_relations")
      .insert("id", group.id, "user_id", friendId);
    setMessage(`Vän tillagd i ${group.name}`);
  }

  useEffect(() => {}, [session]);

  return (
    <S.Wrapper>
      <p>lägg till vänner i {group.name}</p>
    </S.Wrapper>
  );
};

export default AddFriendToGroup;
