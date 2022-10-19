import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabaseClient";
import { useEffect, useState } from "react";

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
    <div className={styles.container}>
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

export default Home;
