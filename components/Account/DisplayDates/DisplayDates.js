import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./DisplayDates.styled";
import GetMutualDates from "./GetMutualDates/GetMutualDates";
import GetGroupDates from "./GetGroupDates/GetGroupDates";

const DisplayDates = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [friends, setFriends] = useState([]);
  const [groupIds, setGroupIds] = useState([]);

  useEffect(() => {
    fetchFriendIds();
    getGroupWhereUserIsIn();
  }, [session]);

  const fetchFriendIds = async () => {
    const { data, error } = await supabase
      .from("friends")
      .select()
      .or(`user_one.eq.${user.id},user_two.eq.${user.id}`);

    // placeholder array to save result from loop!
    const currentFriends = [];

    console.log(data + "hej");

    if (!data.length) {
      setFriends(false);
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
          const id = data[0].id;
          currentFriends.push(data[0]);
        }
        if (friend_two == user.id) {
          const { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("id", friend_one);

          const id = data[0].id;
          currentFriends.push(data[0]);
        }
      }
    }

    setFriends(currentFriends);
  };

  // Fetch group date

  async function getGroupWhereUserIsIn() {
    const { data, error } = await supabase
      .from("group_relations")
      .select()
      .eq("user_id", user.id);

    const currentGroupIds = [];

    if (!data.length) {
      setGroupIds(false);
      return null;
    }

    for (let i = 0; i < data.length; i++) {
      const id = data[i].group_id;
      currentGroupIds.push(id);
    }
    setGroupIds(currentGroupIds);
  }

  return (
    <S.wrapper>
      <h2>Gemensamma datum</h2>
      <p>
        Här ser du gemensamma datum du har med dina vänner. Se till att träffas!
      </p>
      <div>
        {friends ? (
          <>
            {friends.map((friend) => (
              <S.friendDiv key={friend.id}>
                <GetMutualDates
                  friendId={friend.id}
                  friendName={friend.name}
                  friendUserName={friend.username}
                  friendAvatar={friend.avatar_url}
                />
              </S.friendDiv>
            ))}
          </>
        ) : (
          <S.noDateDiv>
            <p>Du har inga vänner</p>
          </S.noDateDiv>
        )}
      </div>
      <h3>Gemensamma datum i grupper</h3>
      <p>
        Här ser du gemensamma datum du har med alla användare i en grupp. Hitta
        på något kul ihop!
      </p>
      {groupIds ? (
        <div>
          {groupIds.map((groupId) => (
            <div key={groupId}>
              <GetGroupDates groupId={groupId} />
            </div>
          ))}
        </div>
      ) : (
        <S.noDateDiv>Du är inte med i några grupper.</S.noDateDiv>
      )}
    </S.wrapper>
  );
};

export default DisplayDates;
