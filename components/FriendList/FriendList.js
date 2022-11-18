import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./FriendList.styled";
import Image from "next/image";

const FriendList = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriendIds();
  }, [session]);

  const RemoveFriend = async (friendId) => {
    const { data, error } = await supabase
      .from("friends")
      .delete()
      .or(`user_one.eq.${user.id},user_one.eq.${friendId}`)
      .or(`user_two.eq.${user.id},user_two.eq.${friendId}`);

    fetchFriendIds();
  };

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
    <S.wrapper>
      <h2>Din vänlista</h2>
      <p>
        Här visas dina nuvarande vänner. Vill du lägga till nya vänner så kan du
        göra det via sök användare i menyn.
      </p>
      <div>
        {friends && (
          <div>
            {friends.map((friend) => (
              <S.FriendDiv key={friend.id}>
                <S.profileWrapper>
                  {friend.avatar_url ? (
                    <S.imageWrapper>
                      <Image
                        src={`https://zsmobqgplqouebjzyqmy.supabase.co/storage/v1/object/public/avatars/${friend.avatar_url}`}
                        width={100}
                        height={100}
                        alt="profilbild"
                      ></Image>
                    </S.imageWrapper>
                  ) : (
                    <S.imageWrapper>
                      <Image
                        src="/profilepicture.png"
                        width={100}
                        height={100}
                        alt="profilbild"
                      ></Image>
                    </S.imageWrapper>
                  )}
                  <S.textWrapper>
                    <p> {friend.username} </p>
                    <p>{friend.name}</p>
                  </S.textWrapper>
                </S.profileWrapper>
                <button
                  onClick={() => {
                    RemoveFriend(friend.id);
                  }}
                >
                  Ta bort vän
                </button>
              </S.FriendDiv>
            ))}
          </div>
        )}
      </div>
    </S.wrapper>
  );
};

export default FriendList;
