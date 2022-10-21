import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";

const SearchUser = ({ session }) => {
  const [fetchError, setFetchError] = useState(null);
  const [users, setUser] = useState(null);
  const user = useUser();

  useEffect(() => {}, [session]);
  const fetchUser = async (event) => {
    event.preventDefault();
    const searchTerm = `${event.target.searchTerm.value}`;
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .or(`name.eq.${searchTerm},username.eq.${searchTerm}`);

    // alt
    // .ilike('name', searchTerm);

    if (error) {
      setFetchError(error.message);
      setUser(null);
      console.log(error);
    }

    if (data) {
      setUser(data);
      setFetchError(null);
    }
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
        <button classname="search-button">search</button>
      </form>
      {fetchError && <p>{fetchError}</p>}
      {users && (
        <div>
          {users.map((user) => (
            <div>
              <p>Användarnamn: {user.username} </p>
              <p>Namn: {user.name}</p>
              <p>Användarid: {user.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
