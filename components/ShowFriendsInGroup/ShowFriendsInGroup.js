import React from "react";
import * as S from "./ShowFriendsInGroup.styled";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";

const ShowFriendsInGroup = ({ session, groupId, groupName }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [message, setMessage] = useState();
  const [friends, setFriends] = useState([]);
  const [friendsInGroup, setFriendsInGroup] = useState([]);

  useEffect(() => {
    fetchFriendIds();
  }, [session]);

  async function removeFriendFromGroup(friendId) {
    const { data, error } = await supabase
      .from("group_relations")
      .delete()
      .eq("user_id", friendId);
    setMessage(`Vän borttagen från ${groupName}`);
    fetchFriendIds();
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
    getFriendsInGroup();
  };

  async function getFriendsInGroup() {
    const { data, error } = await supabase
      .from("group_relations")
      .select("user_id")
      .eq("group_id", groupId);

    if (!data) {
      return false;
    }

    const currentFriends = [];

    for (let i = 0; i < data.length; i++) {
      const friend = data[i].user_id;
      if (friend) {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", friend);
        currentFriends.push(data[0]);
      }
    }
    setFriendsInGroup(currentFriends);
  }

  return (
    <>
      <p>Vänner i din grupp</p>
      <S.Wrapper>
        {friendsInGroup && (
          <>
            {friendsInGroup.map((friend) => (
              <div key={friend.id}>
                <S.showFriendsWrapper>
                  <S.showFriendsWrapperDiv>
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
                  </S.showFriendsWrapperDiv>
                  <S.showFriendsButton
                    onClick={() => {
                      removeFriendFromGroup(friend.id);
                    }}
                  ></S.showFriendsButton>
                </S.showFriendsWrapper>
              </div>
            ))}
          </>
        )}

        {message}
      </S.Wrapper>
    </>
  );
};

export default ShowFriendsInGroup;
