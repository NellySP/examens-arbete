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
    // fetchFriendshipIds();
    fetchFriendIds();
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
  const fetchFriendIds = async () => {
    const { data, error } = await supabase
      .from("friends")
      .select()
      .or(`user_one.eq.${user.id},user_two.eq.${user.id}`);
    setFriendshipIds(data);
    // console.log(data);

    // const i = 0;

    const katt = data;

    katt.forEach(async (element) => {
      // i + 1;

      if (!element) {
        return false;
      }

      if (element) {
        const friend_one = element.user_one;
        const friend_two = element.user_two;
        // console.log(friend_one);
        // console.log(friend_two);
        if (friend_one == user.id) {
          const { element, error } = await supabase
            .from("profiles")
            .select()
            .eq("id", friend_two);
          setFriendId(element);
        }
        if (friend_two == user.id) {
          const { element, error } = await supabase
            .from("profiles")
            .select()
            .eq("id", friend_one);
          setFriendId(element);
        }
      }
    });
  };

  return (
    <S.dateDisplayDiv>
      <h4>Dina vänner:</h4>
      <div>
        {friendId && (
          <div>
            {friendId.map((friend) => (
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
