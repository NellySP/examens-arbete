import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import * as S from "./SearchUser.styled";
import UpdateFriendList from "../UpdateFriendList/UpdateFriendList";
import Image from "next/image";

const SearchUser = ({ session }) => {
  const [fetchError, setFetchError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const user = useUser();

  useEffect(() => {}, [session], [searchResults]);

  // fetch searched users from profile table

  const fetchUser = async (event) => {
    event.preventDefault();
    const searchTerm = `%${event.target.searchTerm.value}%`;
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .or(`name.ilike.${searchTerm},username.ilike.${searchTerm}`)
      .not("id", "eq", user.id);

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
    <S.SearchFriendWrapper>
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
              <S.profileWrapper>
                <S.imageWrapper>
                  {searchResult.avatar_url ? (
                    <S.imageWrapper>
                      <Image
                        src={`https://zsmobqgplqouebjzyqmy.supabase.co/storage/v1/object/public/avatars/${searchResult.avatar_url}`}
                        width={100}
                        height={100}
                      ></Image>
                    </S.imageWrapper>
                  ) : (
                    <S.imageWrapper>
                      <Image
                        src="/profilepicture.png"
                        width={100}
                        height={100}
                      ></Image>
                    </S.imageWrapper>
                  )}
                </S.imageWrapper>
                <S.textWrapper>
                  <p> {searchResult.username} </p>
                  <p>{searchResult.name}</p>
                </S.textWrapper>
              </S.profileWrapper>
              <UpdateFriendList searchResult={searchResult}></UpdateFriendList>
            </S.FriendDiv>
          ))}
        </div>
      )}
    </S.SearchFriendWrapper>
  );
};

export default SearchUser;
