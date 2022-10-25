import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import * as S from "./SearchUser.styled";
import UpdateFriendList from "../UpdateFriendList/UpdateFriendList";

const SearchUser = ({ session }) => {
  const [fetchError, setFetchError] = useState(null);
  // other users
  const [searchResults, setSearchResults] = useState(null);
  // logged in user
  const user = useUser();

  useEffect(() => {}, [session]);

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
            <S.FriendDiv key={searchResult.id}>
              <h4>Användarnamn:</h4>
              <p> {searchResult.username} </p>
              <h4>Namn</h4>
              <p>{searchResult.name}</p>
              <h4>Id</h4>
              <p>{searchResult.id}</p>
              <UpdateFriendList searchResult={searchResult}></UpdateFriendList>
            </S.FriendDiv>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
