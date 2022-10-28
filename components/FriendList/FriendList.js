import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./FriendList.styled";
// Vilken variant kör vi? Denna?
import { supabase } from "../../utils/supabaseClient";

const FriendList = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [friends, setFriends] = useState(null);
  const [friendId, setFriendId] = useState(null);
  const [friendshipIds, setFriendshipIds] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFriendshipIds();
    fetchFriendIds();
  }, [session]);

  //   Fetch users friends here
  const fetchFriendshipIds = async () => {
    const { data, error } = await supabase
      .from("friends")
      .select()
      .or(`user_one.eq.${user.id},user_two.eq.${user.id}`);
    setFriendshipIds(data);
  };

  //   Fetch friend-id here
  const fetchFriendIds = async () => {
    const { data, error } = await supabase
      .from("friends")
      .select()
      .or(`user_one.eq.${user.id},user_two.eq.${user.id}`);

    setFriendId(data);

    if (data) {
      return false;
    }

    // console.log(data);
    if (data) {
      const friend_one = data[0].user_one;
      const friend_two = data[0].user_two;

      if (data[0].user_one == user.id) {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", friend_two);
        console.log(data);
        setFriendId(data);
      }
      if (data[0].user_two == user.id) {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", friend_one);
        console.log(data);
        setFriendId(data);
      }
    }
  };

  // console.log(friendId);

  //   Fetch users friends here
  // const fetchFriends = async () => {
  //   const { data, error } = await supabase
  //     .from("profiles")
  //     .select()
  //     .eq("id", friendId);
  //   setFriends(data);
  // };
  // console.log(friends);

  return (
    <S.dateDisplayDiv>
      <h4>Dina vänner:</h4>
      <div>
        {friendId && (
          <div>
            {friendId.map((friend) => (
              <div key={friend.id}>
                <p>{friend.id}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </S.dateDisplayDiv>
  );
};

export default FriendList;
