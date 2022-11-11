import React from "react";
import * as S from "./AddFriendToGroup.styled";
import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";

const AddFriendToGroup = ({ session, groupId, groupName }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [message, setMessage] = useState();
  const [friends, setFriends] = useState([]);
  //   const [groupId, setGroupId] = useState();

  useEffect(() => {
    fetchFriendIds();
  }, [session]);

  async function removeFriendFromGroup(friendId) {
    const { data, error } = await supabase
      .from("group_relations")
      .delete()
      .eq("user_id", friendId);
    setMessage(`Vän borttagen från ${groupName}`);

    <S.addFriendButton
      onClick={() => {
        removeFriendFromGroup(friend.id);
      }}
    >
      -
    </S.addFriendButton>;
  }

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

  return (
    <>
      <p>Lägg till vänner</p>
      <S.Wrapper>
        {friends && (
          <>
            {friends.map((friend) => (
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
                      addFriendToGroup(friend.id);
                    }}
                  >
                    +
                  </S.addFriendButton>
                </S.profileWrapper>
              </div>
            ))}
          </>
        )}

        {message}
      </S.Wrapper>
    </>
  );
};

export default AddFriendToGroup;