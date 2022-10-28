import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./FriendList.styled";
// Vilken variant kör vi? Denna?
import { supabase } from "../../utils/supabaseClient";

const FriendList = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [friends, setFriends] = useState([]);
  const [friendshipIds, setFriendshipIds] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetchFriendshipIds();
    fetchFriendIds(friends);
  }, [session]);

  //   Fetch users friends here
  // const fetchFriendshipIds = async () => {
  //   const { data, error } = await supabase
  //     .from("friends")
  //     .select()
  //     .or(`user_one.eq.${user.id},user_two.eq.${user.id}`);
  //   setFriendshipIds(data);
  // };

  //   Fetch friend-id here
  const fetchFriendIds = async (friends) => {
    const { data, error } = await supabase
      .from("friends")
      .select()
      .or(`user_one.eq.${user.id},user_two.eq.${user.id}`);
    setFriendshipIds(data);

    if (!data) {
      return false;
    }

    for (let i = 0; i < data.length; i++) {
      if (data) {
        const friend_one = data[i].user_one;
        const friend_two = data[i].user_two;
        // console.log(friend_one);
        // console.log(friend_two);
        if (friend_one == user.id) {
          const { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("id", friend_two);
          setFriends((friends) => [...friends, data]);
        }
        if (friend_two == user.id) {
          const { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("id", friend_one);
          setFriends((friends) => [...friends, data]);
        }
      }
    }
    console.log(friends);
  };

  return (
    <S.dateDisplayDiv>
      <h4>Dina vänner:</h4>
      <div>
        {friends && (
          <div>
            {console.log(friends + "hej")}
            {friends.map((friend) => (
              <div key={friend.id}>
                <p>{friend.username}</p>
                <p>{friend.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </S.dateDisplayDiv>
  );
};

export default FriendList;
