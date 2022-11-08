import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./DisplayDates.styled";
// Vilken variant kör vi? Denna?
import { supabase } from "../../utils/supabaseClient";
import GetDates from "../GetMutualDates/GetMutualDates";

const DisplayDates = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
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
      <h2>Gemensamma datum med dina vänner</h2>
      <div>
        {friends && (
          <div>
            {friends.map((friend) => (
              <div key={friend.id}>
                <GetDates friendId={friend.id} friendName={friend.name} />
              </div>
            ))}
          </div>
        )}
      </div>
    </S.dateDisplayDiv>
  );
};

export default DisplayDates;
