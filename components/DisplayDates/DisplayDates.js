import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./DisplayDates.styled";
// Vilken variant kör vi? Denna?
import { supabase } from "../../utils/supabaseClient";
import GetDates from "../GetDates/GetDates";

const DisplayDates = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // fetchAvailableDates();
    fetchFriendIds();
  }, [session]);

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

  return (
    <S.dateDisplayDiv>
      <h3>Lediga datum!</h3>
      <div>
        {friends && (
          <div>
            {friends.map((friend) => (
              <div key={friend.id}>
                <h4>Lediga datum med: {friend.username}</h4>
                <p>{friend.name}</p>
                <GetDates friendId={friend.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </S.dateDisplayDiv>
  );
};

export default DisplayDates;
