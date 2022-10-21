import { supabase } from "../../utils/supabaseClient";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import * as S from "./index.styled";
import Menu from "../../components/Menu/Menu";
import SearchUser from "../../components/SearchUser/SearchUser";

const Loggedinhome = ({ session }) => {
  const [fetchError, setFetchError] = useState(null);
  const [tests, setTest] = useState(null);
  const user = useUser();

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
    <S.Wrapper>
      <Menu session={session} />
      {/* {fetchError && <p>{fetchError}</p>}
      {tests && (
        <div>
          {tests.map((test) => (
            <p>
              {test.name}
              {user.id}
            </p>
          ))}
        </div>
      )} */}
      <SearchUser session={session} />
    </S.Wrapper>
  );
};

export default Loggedinhome;
