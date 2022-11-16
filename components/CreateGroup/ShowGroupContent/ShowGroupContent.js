import React from "react";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import * as S from "../../AddFriendToGroup/AddFriendToGroup.styled";
import Image from "next/image";
// import AddFriend from "./AddFriend/AddFriend";
// import ShowFriend from "./ShowFriend/ShowFriend";

const ShowGroupContent = ({ session, groupId, groupName }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [friends, setFriends] = useState([]);
  const [friendsInGroup, setFriendsInGroup] = useState([]);
  const [friendsNotInGroup, setFriendsNotInGroup] = useState([]);

  useEffect(() => {
    fetchFriends();
  }, [session]);

  //  Fetch all users friends
  const fetchFriends = async () => {
    const { data, error } = await supabase
      .from("friends")
      .select()
      .or(`user_one.eq.${user.id},user_two.eq.${user.id}`);

    // placeholder array to save result from loop!
    const placeholderArray = [];

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
          placeholderArray.push(data[0]);
        }
        if (friend_two == user.id) {
          const { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("id", friend_one);

          placeholderArray.push(data[0]);
        }
      }
    }
    setFriends(placeholderArray);
    checkifFriendIsAlreadyInGroup();
  };

  async function checkifFriendIsAlreadyInGroup() {
    const placeholderArray = [];
    const secondPlaceholderArray = [];
    for (let i = 0; i < friends.length; i++) {
      const { data, error } = await supabase
        .from("group_relations")
        .select()
        .or(`and(user_id.eq.${friends[i].id},group_id.eq.${groupId})`);

      if (data.length == 0) {
        placeholderArray.push(friends[i]);
      }
      if (data.length) {
        secondPlaceholderArray.push(friends[i]);
      }
    }
    setFriendsInGroup(secondPlaceholderArray);
    setFriendsNotInGroup(placeholderArray);
  }

  async function addFriendToGroup(friendId) {
    const { data, error } = await supabase
      .from("group_relations")
      .insert({ group_id: groupId, user_id: friendId });
    fetchFriends();
    // setMessage(`Vän tillagd i ${groupName}`);
  }
  async function removeFriendFromGroup(friendId) {
    const { data, error } = await supabase
      .from("group_relations")
      .delete()
      .eq("user_id", friendId);

    fetchFriends();
  }

  // console.log(JSON.stringify(friendsInGroup) + "Du är i gruppen");
  // console.log(JSON.stringify(friendsNotInGroup) + "Du är inte gruppen");
  // for (let i = 0; i < friendsNotInGroup.length; i++) {
  //   console.log(friendsNotInGroup[i].name);
  // }

  return (
    <>
      <>
        {friendsInGroup && (
          <>
            {friendsInGroup.map((friend) => (
              <div key={friend.id}>
                <S.profileWrapper>
                  <S.groupWrapperDiv>
                    {friend.avatar_url ? (
                      <S.imageWrapper>
                        <Image
                          src={`https://zsmobqgplqouebjzyqmy.supabase.co/storage/v1/object/public/avatars/${friend.avatar_url}`}
                          width={50}
                          height={50}
                        ></Image>
                      </S.imageWrapper>
                    ) : (
                      <S.imageWrapper>
                        <Image
                          src="/profilepicture.png"
                          width={50}
                          height={50}
                        ></Image>
                      </S.imageWrapper>
                    )}

                    <S.textWrapper>
                      <p> {friend.username} </p>
                      <p>{friend.name}</p>
                    </S.textWrapper>
                  </S.groupWrapperDiv>
                  <S.addFriendButton
                    onClick={() => {
                      removeFriendFromGroup(friend.id);
                    }}
                  >
                    -
                  </S.addFriendButton>
                </S.profileWrapper>
              </div>
            ))}
          </>
        )}
      </>
      <p>EJ I GRUPPEN!!!</p>
      <>
        {friendsNotInGroup && (
          <>
            {friendsNotInGroup.map((friend) => (
              <div key={friend.id}>
                {friend.name}
                <button
                  onClick={() => {
                    addFriendToGroup(friend.id);
                  }}
                ></button>
              </div>
            ))}
          </>
        )}
      </>
    </>
  );
};

export default ShowGroupContent;
