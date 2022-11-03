import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./DisplayDates.styled";
// Vilken variant kör vi? Denna?
import { supabase } from "../../utils/supabaseClient";

const DisplayDates = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [dates, setDates] = useState(null);
  const [friends, setFriends] = useState([]);
  const [friendId, setFriendId] = useState([]);

  useEffect(() => {
    // fetchAvailableDates();
    fetchFriendIds();
  }, [session]);

  const test_id = "6d63176d-aad5-4912-a017-a5dc4d05c21a";

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
          const id = data[0].id;
          console.log(id);
          fetchAvailableDates(id);
        }
        if (friend_two == user.id) {
          const { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("id", friend_one);

          currentFriends.push(data[0]);
          const id = data[0].id;
          console.log(id);
          fetchAvailableDates(id);
        }
      }
    }
    setFriends(currentFriends);
  };

  // Fetch available dates here

  // const test = "6d63176d-aad5-4912-a017-a5dc4d05c21a";

  const fetchAvailableDates = async (friendId) => {
    const { data, error } = await supabase.rpc("testing_five", {
      user_id_input: user.id,
      friend_id_input: friendId,
    });

    console.log(data);
  };

  return (
    <S.dateDisplayDiv>
      <p>Display all available dates here</p>
      <h4>Dina vänner:</h4>
      <div>
        {friends && (
          <div>
            {friends.map((friend) => (
              <div key={friend.id}>
                <p>{friend.username}</p>
                <p>{friend.name}</p>
                <p>{dates}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </S.dateDisplayDiv>
  );
};

export default DisplayDates;
