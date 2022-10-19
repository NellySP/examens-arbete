import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as S from "./index.styled";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [tests, setTest] = useState(null);

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
  }, []);
  return (
    <S.wrapperDiv>
      <Link href="/signup">Sign up, step one</Link>
      <Link href="/signupprofile">Sign up, step two</Link>
      <Link href="/login">Startsida</Link>
      {fetchError && <p>{fetchError}</p>}
      {tests && (
        <div>
          {tests.map((test) => (
            <p>{test.name}</p>
          ))}
        </div>
      )}
    </S.wrapperDiv>
  );
};

export default Home;
