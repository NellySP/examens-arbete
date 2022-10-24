import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";

const SearchUser = ({ session }) => {
  const [fetchError, setFetchError] = useState(null);
  // other users
  const [searchResults, setSearchResults] = useState(null);
  // logged in user
  const user = useUser();

  useEffect(() => {
    // check if users already exist in friend table
  }, [session]);

  // Check if users are friends

  const checkIfAlreadyFriends = async (searchedFriend) => {
    const { data, error } = await supabase
      .from("friends")
      .select("is_friends")
      .or(`user_one.eq.${user.id},user_one.eq.${searchedFriend}`)
      .or(`user_two.eq.${user.id},user_two.eq.${searchedFriend}`);

    data.map((friend) => {
      if (friend.is_friends === true) {
        console.log("Ni är vänner!");
        return true;
      } else {
        console.log("Ni är inte vänner");
        false;
      }
    });
  };

  // Test att knapparna verkligen fungerar. Svar ja.

  // const checkIfAlreadyFriends = () => {
  //   const age = 20;
  //   if (age > 15) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // fetch searched users from profile table

  const fetchUser = async (event) => {
    event.preventDefault();
    const searchTerm = `%${event.target.searchTerm.value}%`;
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .or(`name.ilike.${searchTerm},username.ilike.${searchTerm}`);

    if (error) {
      setFetchError(error.message);
      setSearchResults(null);
      console.log(error);
    }

    if (data) {
      setSearchResults(data);
      setFetchError(null);
    }
  };

  // add user and friend to friend table

  const addFriend = async (userTwoId) => {
    console.log("You added a friend");
    console.log(user.id);
    const { data, error } = await supabase
      .from("friends")
      .insert({ user_one: user.id, user_two: userTwoId, is_friends: true });
  };

  return (
    <div>
      <form onSubmit={fetchUser}>
        <input
          className="search"
          name="searchTerm"
          id="searchTerm"
          type="text"
        ></input>
        <button className="search-button">search</button>
      </form>
      {fetchError && <p>{fetchError}</p>}
      {searchResults && (
        <div>
          {searchResults.map((searchResult) => (
            <div key={searchResult.id}>
              <h4>Användarnamn:</h4>
              <p> {searchResult.username} </p>
              <h4>Namn</h4>
              <p>{searchResult.name}</p>
              <h4>Id</h4>
              <p>{searchResult.id}</p>

              {checkIfAlreadyFriends(searchResult.id) && (
                <button onClick={() => addFriend(searchResult.id)}>
                  Add friend
                </button>
              )}
              {!checkIfAlreadyFriends(searchResult.id) && (
                <button onClick={() => addFriend(searchResult.id)}>
                  Remove friend
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
