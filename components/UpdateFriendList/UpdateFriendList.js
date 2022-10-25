import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";

const UpdateFriendList = ({ session, searchResult }) => {
  const [isFriend, setIsFriend] = useState(false);
  const [friendId, setFriendId] = useState();
  const user = useUser();

  // Checks if users are friends
  const checkIfAlreadyFriends = async (searchedFriend) => {
    const { data, error } = await supabase
      .from("friends")
      .select("is_friends, id")
      .or(`user_one.eq.${user.id},user_one.eq.${searchedFriend}`)
      .or(`user_two.eq.${user.id},user_two.eq.${searchedFriend}`);

    if (typeof data[0] !== "undefined") {
      setFriendId(data[0].id);
      return true;
    } else {
      return false;
    }
  };

  useEffect(
    () => {
      async function checkIfFriend() {
        const result = await checkIfAlreadyFriends(searchResult.id);
        setIsFriend(result);
      }
      checkIfFriend();
    },
    [searchResult.id],
    [session]
  );

  // Add friend to friendlist

  const addFriend = async (userTwoId) => {
    const { data, error } = await supabase
      .from("friends")
      .insert({ user_one: user.id, user_two: userTwoId, is_friends: true });
  };

  // Remove friend from friendlist

  const RemoveFriend = async () => {
    const { data, error } = await supabase
      .from("friends")
      .delete()
      .eq("id", friendId);
  };

  return (
    <div>
      {isFriend ? (
        <div>
          <p>Ni är redan vänner</p>
          <button
            onClick={() => {
              RemoveFriend(searchResult.id);
            }}
          >
            Ta bort {searchResult.name} som vän
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            addFriend(searchResult.id);
            useEffect;
          }}
        >
          Add friend
        </button>
      )}
    </div>
  );
};
export default UpdateFriendList;
