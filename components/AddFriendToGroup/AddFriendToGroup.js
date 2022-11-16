import React from "react";
import * as S from "./AddFriendToGroup.styled";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import ShowFriend from "./ShowFriend/ShowFriend";

const AddFriendToGroup = ({ session, groupId, groupName }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [message, setMessage] = useState();
  const [friends, setFriends] = useState([]);
  const [openAddUser, setOpenAddUser] = useState(false);

  useEffect(() => {
    fetchFriendIds();
    setOpenAddUser(false);
  }, [session]);

  async function addFriendToGroup(friendId) {
    const { data, error } = await supabase
      .from("group_relations")
      .insert({ group_id: groupId, user_id: friendId });
    setMessage(`Vän tillagd i ${groupName}`);
  }

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

  function setToTrue() {
    if (openAddUser == false) {
      setOpenAddUser(true);
    }
    if (openAddUser) {
      setOpenAddUser(false);
    }
  }

  setTimeout(function () {
    setMessage(null);
  }, 5000);

  return (
    <>
      <S.p onClick={setToTrue}>Lägg till användare i gruppen</S.p>
      {openAddUser && (
        <S.Wrapper>
          {friends && (
            <>
              {friends.map((friend) => (
                <div key={friend.id}>
                  <ShowFriend
                    friendId={friend.id}
                    friendName={friend.name}
                    friendUsername={friend.username}
                    friendAvatar={friend.avatar_url}
                    groupId={groupId}
                  ></ShowFriend>
                </div>
              ))}
            </>
          )}

          {message}
        </S.Wrapper>
      )}
    </>
  );
};

export default AddFriendToGroup;
