import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";

const SearchUser = ({ session }) => {
  const [fetchError, setFetchError] = useState(null);
  // other users
  const [searchResults, setSearchResults] = useState(null);
  // friends from databse
  const [checkIfFriends, setIfFriends] = useState(null);
  // logged in user
  const user = useUser();

  useEffect(() => {
    // check if users already exist in friend table

    const checkIfAlreadyFriends = async () => {
      const { data, error } = await supabase.from("friends").select();
      console.log(data);
      if (data) {
        setIfFriends(data);
      }
    };
    checkIfAlreadyFriends();
  }, [session]);

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
    event.preventDefault();
    console.log("You added a friend");
    console.log(user.id);
    const { data, error } = await supabase
      .from("friends")
      .insert({ user_one: user.id, user_two: userTwoId });
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
              {console.log(searchResult.id)}
              {checkIfFriends.map(
                (checkfriend) =>
                  console.log(checkfriend.user_two, checkfriend.user_one),

                console.log("bajskorv")
              )}

              <button onClick={() => addFriend(searchResult.id)}>
                Add friend
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
