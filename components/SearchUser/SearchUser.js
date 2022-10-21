import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";

const SearchUser = ({ session }) => {
  useEffect({}, [session]);

  const [searchResults, setSearchResults] = useState([]);
  const [formInput, setFormInput] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleInput = (event) => {
    let { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
    setSearchTerm(event.target.value);
  };

  const search = async (event) => {
    event.preventDefault();
    let users = await fetch(
      supabase.from("profiles").select("name").eq({ searchTerm })
    );
    users = await users.json;
    setSearchResults(users.results);
  };
  return (
    <div>
      <form onSubmit={search}>
        <input
          className="search"
          name="searchTerm"
          value={searchTerm}
          onChange={handleInput()}
          type="text"
        ></input>
        <button classname="search-button">search</button>
      </form>
      <div>
        <p>{searchResults}</p>
      </div>
    </div>
  );
};

export default SearchUser;
