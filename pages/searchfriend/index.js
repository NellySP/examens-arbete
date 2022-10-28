import { supabase } from "../../utils/supabaseClient";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser, useSession } from "@supabase/auth-helpers-react";
import * as GS from "../index.styled";
import Menu from "../../components/Menu/Menu";
import SearchUser from "../../components/SearchUser/SearchUser";

const SearchFriend = () => {
  const [fetchError, setFetchError] = useState(null);
  const [tests, setTest] = useState(null);
  const user = useUser();
  const session = useSession();

  useEffect(() => {
    const fetchTest = async () => {
      const { data, error } = await supabase.from("profiles").select();

      if (error) {
        setFetchError("Something went wrong");
        setTest(null);
        console.log(error);
      }

      if (data) {
        setTest(data);
        setFetchError(null);
      }
    };
    fetchTest();
  }, [session]);
  return (
    <GS.Wrapper>
      <Menu session={session} />
      <GS.Div>
        <SearchUser session={session} />
      </GS.Div>
    </GS.Wrapper>
  );
};

export default SearchFriend;