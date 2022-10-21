import { supabase } from "../../utils/supabaseClient";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

const Test = ({ session }) => {
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
    <div>
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
    </div>
  );
};

export default Test;
