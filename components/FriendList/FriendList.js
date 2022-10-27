import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./FriendList.styled";
// Vilken variant kör vi? Denna?
import { supabase } from "../../utils/supabaseClient";

const FriendList = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    fetchFriends();
  }, [session]);

  //   Fetch users friends here
  const fetchFriends = async () => {
    const { data, error } = await supabase
      .from("friends")
      .select()
      .or(`user_one.eq.${user.id},user_two.eq.${user.id}`);
    setFriends(data);
  };
  console.log(friends);

  return (
    <S.dateDisplayDiv>
      <h4>Dina vänner:</h4>
      <div>
        {friends && (
          <div>
            {friends.map((friend) => (
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
