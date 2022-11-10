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
  const [friends, setFriends] = useState([]);

  async function addFriendToGroup(event) {
    event.prevent.default;
    const [data, error] = await supabase
      .from("group_relations")
      .insert("id", group.id, "user_id", friendId);
    setMessage(`Vän tillagd i ${group.name}`);
  }

  useEffect(() => {
    fetchFriendIds();
  }, [session]);
  //  Fetch all users friends
  const fetchFriendIds = async () => {
    const { data, error } = await supabase
      .from("friends")
      .select()
      .or(`user_one.eq.${user.id},user_two.eq.${user.id}`);

    // placeholder array to save result from loop!
    const currentFriends = [];

    if (!data) {
      return false;
    }

    for (let i = 0; i < data.length; i++) {
      if (data) {
        const friend_one = data[i].user_one;
        const friend_two = data[i].user_two;

        if (friend_one == user.id) {
          const { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("id", friend_two);
          currentFriends.push(data[0]);
        }
        if (friend_two == user.id) {
          const { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("id", friend_one);

          currentFriends.push(data[0]);
        }
      }
    }
    setFriends(currentFriends);
  };

  return (
    <S.Wrapper>
      <p>lägg till vänner i {group.name}</p>
      <form>
        <div>
          <label htmlFor="friends">Välj vän:</label>
        </div>
        <select name="friends" id="friends">
          <option></option>
          {friends && (
            <>
              {friends.map((friend) => (
                <option key={friend.id}>{friend.name}</option>
              ))}
            </>
          )}
        </select>
        <div>
          <button type="submit">Lägg till</button>
        </div>
      </form>
    </S.Wrapper>
  );
};

export default AddFriendToGroup;
